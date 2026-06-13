import { type LogInFormData, logInSchema } from "@flashcards/common";
import { zodResolver } from "@hookform/resolvers/zod";
import Eye from "@modules/Modal/Eye";
import { useModalStore } from "@modules/Modal/store";
import { useAuthStore } from "@store/auth";
import Input from "@ui/Input";
import { Button } from "@ui/InteractiveElement";
import TextLabel from "@ui/TextLabel";
import { KeyboardEvent, memo, MouseEvent, useState } from "react";
import { type Resolver, useForm } from "react-hook-form";

import { applyFieldErrors } from "./applyFieldErrors";
import Error from "./components/Error/Error";
import SignUp from "./SignUp";
import s from "./styles.module.scss";

const LogIn = () => {
  const replace = useModalStore(state => state.replace);
  const close = useModalStore(state => state.close);
  const logIn = useAuthStore(state => state.logIn);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LogInFormData>({
    resolver: zodResolver(logInSchema) as Resolver<LogInFormData>,
    mode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (data: LogInFormData) => {
    try {
      const result = await logIn(data);

      if (result.success === false) {
        applyFieldErrors(setError, result.fieldErrors);
        return;
      }

      close();
    } catch (err) {
      console.error("Login failed:", err);
    }
  });

  const onPasswordVisibleButton = (e: MouseEvent<SVGElement>) => {
    e.preventDefault();
    setIsPasswordVisible(v => !v);
  };

  const onClickChangeModal = () => {
    replace({ title: "Sign up", content: <SignUp /> });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") void onSubmit();
  };

  return (
    <>
      <Error message={errors.username?.message} />
      <Input
        {...register("username")}
        id="username"
        className={s.login_input}
        placeholder="Type your username"
        onKeyDown={onKeyDown}
      />
      <TextLabel htmlFor="username" className={s.label}>
        USERNAME
      </TextLabel>

      <Error message={errors.password?.message} />
      <Input
        {...register("password")}
        type={isPasswordVisible ? "text" : "password"}
        id="password"
        className={s.login_input}
        placeholder="Type your password"
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
        active={isValid && !isSubmitting}
        loading={isSubmitting}
        onClick={onSubmit}
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
