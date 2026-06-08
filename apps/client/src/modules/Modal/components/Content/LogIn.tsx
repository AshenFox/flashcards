import Eye from "@modules/Modal/Eye";
import { useMutation } from "@tanstack/react-query";
import Input from "@ui/Input";
import { Button } from "@ui/InteractiveElement";
import TextLabel from "@ui/TextLabel";
import { type LogInErrors, useAuthStore } from "@zustand/auth";
import { useModalStore } from "@zustand/modal";
import { ChangeEvent, KeyboardEvent, memo, MouseEvent, useState } from "react";

import Error from "./components/Error/Error";
import SignUp from "./SignUp";
import s from "./styles.module.scss";

const defaultLogInErrors: LogInErrors = {
  ok: true,
  username: { ok: true, errors: [] },
  password: { ok: true, errors: [] },
};

const LogIn = () => {
  const replace = useModalStore(state => state.replace);
  const close = useModalStore(state => state.close);
  const logIn = useAuthStore(state => state.logIn);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(defaultLogInErrors);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const loginMutation = useMutation({
    mutationFn: () => logIn({ username, password }),
    onSuccess: result => {
      setErrors(result);
      if (result.ok) close();
    },
    onError: err => {
      console.error("Login failed:", err);
    },
  });

  const onPasswordVisibleButton = (e: MouseEvent<SVGElement>) => {
    e.preventDefault();
    setIsPasswordVisible(v => !v);
  };

  const onClickChangeModal = (_e: MouseEvent<HTMLButtonElement>) => {
    replace({ title: "Sign up", content: <SignUp /> });
  };

  const onClickSubmit = (_e: MouseEvent<HTMLButtonElement>) => {
    loginMutation.mutate();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") loginMutation.mutate();
  };

  const userErr = errors.username;
  const passErr = errors.password;

  return (
    <>
      <Error errObj={userErr} single={true} />
      <Input
        name="username"
        id="username"
        className={s.login_input}
        placeholder="Type your username"
        value={username}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <TextLabel htmlFor="username" className={s.label}>
        USERNAME
      </TextLabel>

      {userErr.ok && <Error errObj={passErr} single={true} />}
      <Input
        type={isPasswordVisible ? "text" : "password"}
        name="password"
        id="password"
        className={s.login_input}
        placeholder="Type your password"
        value={password}
        onChange={onChange}
        onKeyDown={onKeyDown}
        after={
          <Eye
            isVisible={isPasswordVisible}
            onClick={onPasswordVisibleButton}
          />
        }
      />
      <TextLabel htmlFor="password" className={s.label}>
        PASSWORD
      </TextLabel>

      <Button
        active={!loginMutation.isSuccess}
        loading={loginMutation.isPending}
        onClick={onClickSubmit}
        className={s.submit_button}
      >
        Log in
      </Button>

      <div className={s.options}>
        <p>
          Don&apos;t have an account?{" "}
          <button onClick={onClickChangeModal}>Sign up!</button>
        </p>
      </div>
    </>
  );
};

export default memo(LogIn);
