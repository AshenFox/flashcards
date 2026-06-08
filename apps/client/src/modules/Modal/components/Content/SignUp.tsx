import { authCheckSignUp } from "@api/methods";
import Eye from "@modules/Modal/Eye";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import Input from "@ui/Input";
import { Button } from "@ui/InteractiveElement";
import TextLabel from "@ui/TextLabel";
import { type SignUpErrors, useAuthStore } from "@zustand/auth";
import { useModalStore } from "@zustand/modal";
import clsx from "clsx";
import { ChangeEvent, memo, MouseEvent, useRef, useState } from "react";

import Error from "./components/Error/Error";
import LogIn from "./LogIn";
import s from "./styles.module.scss";

const defaultSignUpErrors: SignUpErrors = {
  ok: false,
  username: { ok: true, errors: [] },
  password: { ok: true, errors: [] },
  email: { ok: true, errors: [] },
};

const SignUp = () => {
  const replace = useModalStore(state => state.replace);
  const close = useModalStore(state => state.close);
  const signUp = useAuthStore(state => state.signUp);

  const [liveValues, setLiveValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [checkValues, setCheckValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [submitErrors, setSubmitErrors] = useState<SignUpErrors | null>(null);
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasInput = !!(
    liveValues.username ||
    liveValues.email ||
    liveValues.password
  );

  const validationQuery = useQuery({
    queryKey: ["signUpCheck", checkValues],
    queryFn: () => authCheckSignUp<SignUpErrors>(checkValues),
    enabled: hasInput,
    placeholderData: keepPreviousData,
  });

  const signUpMutation = useMutation({
    mutationFn: () => signUp(liveValues),
    onSuccess: result => {
      if (result.ok) {
        close();
      } else {
        setSubmitErrors(result);
      }
    },
    onError: err => {
      console.error("Sign up failed:", err);
    },
  });

  const isCheckingField = validationQuery.isFetching;
  const validationErrors =
    submitErrors ?? validationQuery.data ?? defaultSignUpErrors;

  const onPasswordVisibleButton = (e: MouseEvent<SVGElement>) => {
    e.preventDefault();
    setIsPasswordVisible(v => !v);
  };

  const onClickChangeModal = () => {
    replace({ title: "Log in", content: <LogIn /> });
  };

  const onClickSubmit = () => {
    setTouched(new Set(["username", "email", "password"]));
    signUpMutation.mutate();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const next = { ...liveValues, [name]: value };

    setLiveValues(next);
    setSubmitErrors(null);
    setTouched(prev => new Set(prev).add(name));

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setCheckValues(next);
    }, 500);
  };

  const userErr = validationErrors.username;
  const passErr = validationErrors.password;
  const emailErr = validationErrors.email;

  return (
    <>
      {touched.has("username") && <Error errObj={userErr} />}
      <TextLabel htmlFor="username">USERNAME:</TextLabel>
      <Input
        name="username"
        type="text"
        className={clsx(
          s.signup_input,
          touched.has("username") &&
            !!liveValues.username &&
            userErr?.ok &&
            !isCheckingField &&
            s.success,
        )}
        id="username"
        placeholder="Enter a user name"
        value={liveValues.username}
        onChange={onChange}
      />

      {touched.has("email") && <Error errObj={emailErr} />}
      <TextLabel htmlFor="email">EMAIL:</TextLabel>
      <Input
        name="email"
        type="email"
        className={clsx(
          s.signup_input,
          touched.has("email") &&
            !!liveValues.email &&
            emailErr.ok &&
            !isCheckingField &&
            s.success,
        )}
        id="email"
        placeholder="Enter an email"
        value={liveValues.email}
        onChange={onChange}
      />

      {touched.has("password") && <Error errObj={passErr} />}
      <TextLabel htmlFor="password">PASSWORD:</TextLabel>
      <Input
        name="password"
        type={isPasswordVisible ? "text" : "password"}
        className={clsx(
          s.signup_input,
          touched.has("password") &&
            !!liveValues.password &&
            passErr.ok &&
            !isCheckingField &&
            s.success,
        )}
        id="password"
        placeholder="Enter a password"
        value={liveValues.password}
        onChange={onChange}
        after={
          <Eye
            isVisible={isPasswordVisible}
            onClick={onPasswordVisibleButton}
          />
        }
      />

      <Button
        active={
          validationErrors.ok && !isCheckingField && !signUpMutation.isSuccess
        }
        loading={signUpMutation.isPending || isCheckingField}
        onClick={onClickSubmit}
        className={s.submit_button}
      >
        Sign up
      </Button>

      <div className={s.options}>
        <p>
          Already have an account?{" "}
          <button onClick={onClickChangeModal}>Log in!</button>
        </p>
      </div>
    </>
  );
};

export default memo(SignUp);
