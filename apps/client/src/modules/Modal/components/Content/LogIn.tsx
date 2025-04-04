import Eye from "@modules/Modal/Eye";
import { useActions, useAppSelector } from "@store/hooks";
import { ModalInputFields } from "@store/reducers/modal/types";
import Input from "@ui/Input";
import { Button } from "@ui/InteractiveElement";
import TextLabel from "@ui/TextLabel";
import { ChangeEvent, KeyboardEvent, memo, MouseEvent, useState } from "react";

import Error from "./components/Error/Error";
import s from "./styles.module.scss";

const LogIn = () => {
  const { changeModal, controlField, enter } = useActions();

  const username = useAppSelector(s => s.modal.log_in.username);
  const password = useAppSelector(s => s.modal.log_in.password);
  const userErr = useAppSelector(s => s.modal.log_in_errors.username);
  const passErr = useAppSelector(s => s.modal.log_in_errors.password);
  const loading = useAppSelector(s => s.modal.loading);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const onPasswordVisibleButton = (e: MouseEvent<SVGElement>) => {
    e.preventDefault();
    setIsPasswordVisible(v => !v);
  };

  const onClickChangeModal =
    (value: "sign_up") => (e: MouseEvent<HTMLButtonElement>) => {
      changeModal({ active_modal: value });
    };

  const onCLickLoadingButton =
    (value: "log_in") => (e: MouseEvent<HTMLButtonElement>) => {
      enter(value);
    };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name as ModalInputFields;

    controlField({ field: "log_in", name, value });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") enter("log_in");
  };

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
        active={true}
        loading={loading}
        onClick={onCLickLoadingButton("log_in")}
        className={s.submit_button}
      >
        Log in
      </Button>

      <div className={s.options}>
        <p>
          Don&apos;t have an account?{" "}
          <button onClick={onClickChangeModal("sign_up")}>Sign up!</button>
        </p>
      </div>
    </>
  );
};

export default memo(LogIn);
