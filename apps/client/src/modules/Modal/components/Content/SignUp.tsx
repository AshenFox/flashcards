import { type SignUpFormData, signUpSchema } from "@flashcards/common";
import { zodResolver } from "@hookform/resolvers/zod";
import Eye from "@modules/Modal/Eye";
import { useModalStore } from "@modules/Modal/store";
import { useAuthStore } from "@store/auth";
import Input from "@ui/Input";
import { Button } from "@ui/InteractiveElement";
import TextLabel from "@ui/TextLabel";
import clsx from "clsx";
import { memo, MouseEvent, useState } from "react";
import { type Resolver, useForm } from "react-hook-form";

import { applyFieldErrors } from "./applyFieldErrors";
import Error from "./components/Error/Error";
import LogIn from "./LogIn";
import s from "./styles.module.scss";

const SignUp = () => {
  const replace = useModalStore(state => state.replace);
  const close = useModalStore(state => state.close);
  const signUp = useAuthStore(state => state.signUp);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, touchedFields, isValid, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema) as Resolver<SignUpFormData>,
    mode: "all",
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (data: SignUpFormData) => {
    try {
      const result = await signUp(data);

      if (result.success === false) {
        applyFieldErrors(setError, result.fieldErrors);
        return;
      }

      close();
    } catch (err) {
      console.error("Sign up failed:", err);
    }
  });

  const onPasswordVisibleButton = (e: MouseEvent<SVGElement>) => {
    e.preventDefault();
    setIsPasswordVisible(v => !v);
  };

  const onClickChangeModal = () => {
    replace({ title: "Log in", content: <LogIn /> });
  };

  return (
    <>
      {touchedFields.username && <Error message={errors.username?.message} />}
      <TextLabel htmlFor="username">USERNAME:</TextLabel>
      <Input
        {...register("username")}
        type="text"
        className={clsx(
          s.signup_input,
          touchedFields.username && !errors.username && s.success,
        )}
        id="username"
        placeholder="Enter a user name"
      />

      {touchedFields.email && <Error message={errors.email?.message} />}
      <TextLabel htmlFor="email">EMAIL:</TextLabel>
      <Input
        {...register("email")}
        type="email"
        className={clsx(
          s.signup_input,
          touchedFields.email && !errors.email && s.success,
        )}
        id="email"
        placeholder="Enter an email"
      />

      {touchedFields.password && <Error message={errors.password?.message} />}
      <TextLabel htmlFor="password">PASSWORD:</TextLabel>
      <Input
        {...register("password")}
        type={isPasswordVisible ? "text" : "password"}
        className={clsx(
          s.signup_input,
          touchedFields.password && !errors.password && s.success,
        )}
        id="password"
        placeholder="Enter a password"
        after={
          <Eye
            isVisible={isPasswordVisible}
            onClick={onPasswordVisibleButton}
          />
        }
      />

      <Button
        active={isValid && !isSubmitting}
        loading={isSubmitting}
        onClick={onSubmit}
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
