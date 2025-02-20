import Eye from "@modules/Modal/Eye";
import { useActions, useAppSelector } from "@store/hooks";
import { ModalInputFields } from "@store/reducers/modal/types";
import Input from "@ui/Input";
import { Button } from "@ui/InteractiveElement";
import TextLabel from "@ui/TextLabel";
import clsx from "clsx";
import { ChangeEvent, memo, MouseEvent, useRef, useState } from "react";

import Error from "./components/Error/Error";
import s from "./styles.module.scss";

const SignUp = () => {
  const { changeModal, controlField, enter, checkField } = useActions();

  const username = useAppSelector(s => s.modal.sign_up.username);
  const password = useAppSelector(s => s.modal.sign_up.password);
  const email = useAppSelector(s => s.modal.sign_up.email);
  const userErr = useAppSelector(s => s.modal.sign_up_errors.username);
  const passErr = useAppSelector(s => s.modal.sign_up_errors.password);
  const emailErr = useAppSelector(s => s.modal.sign_up_errors.email);
  const ok = useAppSelector(s => s.modal.sign_up_errors.ok);
  const loading = useAppSelector(s => s.modal.loading);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onPasswordVisibleButton = (e: MouseEvent<SVGElement>) => {
    e.preventDefault();
    setIsPasswordVisible(v => !v);
  };

  const onClickChangeModal =
    (value: "log_in") => (e: MouseEvent<HTMLButtonElement>) => {
      changeModal({ active_modal: value });
    };

  const onCLickLoadingButton =
    (value: "sign_up") => (e: MouseEvent<HTMLButtonElement>) => {
      enter(value);
    };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.value;
    const name = target.name as ModalInputFields;

    controlField({ field: "sign_up", name, value });

    // Timer control
    let timer = timers.current[name];

    if (timer) clearTimeout(timer);
    timers.current[name] = setTimeout(() => {
      checkField(name);
      timers.current[name] = null;
    }, 500);
  };

  const timers = useRef<{
    username: ReturnType<typeof setTimeout>;
    email: ReturnType<typeof setTimeout>;
    password: ReturnType<typeof setTimeout>;
  }>({
    username: null,
    email: null,
    password: null,
  });

  return (
    <>
      <Error errObj={userErr} />
      <TextLabel htmlFor="username">USERNAME:</TextLabel>
      <Input
        name="username"
        type="text"
        className={clsx(
          s.signup_input,
          !!username && userErr?.ok && !timers.current.username && s.success,
        )}
        id="username"
        placeholder="Enter a user name"
        value={username}
        onChange={onChange}
      />

      <Error errObj={emailErr} />
      <TextLabel htmlFor="email">EMAIL:</TextLabel>
      <Input
        name="email"
        type="email"
        className={clsx(
          s.signup_input,
          !!email && emailErr.ok && !timers.current.email && s.success,
        )}
        id="email"
        placeholder="Enter an email"
        value={email}
        onChange={onChange}
      />

      <Error errObj={passErr} />
      <TextLabel htmlFor="password">PASSWORD:</TextLabel>
      <Input
        name="password"
        type={isPasswordVisible ? "text" : "password"}
        className={clsx(
          s.signup_input,
          !!password && passErr.ok && !timers.current.password && s.success,
        )}
        id="password"
        placeholder="Enter a password"
        value={password}
        onChange={onChange}
        after={
          <Eye
            isVisible={isPasswordVisible}
            onClick={onPasswordVisibleButton}
          />
        }
      />

      <Button
        active={ok}
        loading={loading}
        onClick={onCLickLoadingButton("sign_up")}
        className={s.submit_button}
      >
        Sign up
      </Button>

      <div className={s.options}>
        <p>
          Already have an account?{" "}
          <button onClick={onClickChangeModal("log_in")}>Log in!</button>
        </p>
      </div>
    </>
  );
};

export default memo(SignUp);
