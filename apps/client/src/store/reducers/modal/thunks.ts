import { axiosInstance } from "@flashcards/common";
import { ThunkActionApp } from "@store/store";

import { modalActions } from "./slice";
import { LogInErrors, SignUpErrors } from "./types";

export const enter = (type: "log_in" | "sign_up") => <ThunkActionApp>(async (
    dispatch,
    getState,
  ) => {
    const pathname = window.location.pathname;

    try {
      const {
        modal: { log_in, sign_up, loading },
      } = getState();

      if (loading) throw new Error("The data is already being loaded ...");

      dispatch(modalActions.changeModalLoading({ value: true }));

      const {
        data: { token, errors },
      } = await axiosInstance.post<{
        token: string;
        errors: LogInErrors | SignUpErrors;
      }>(`/api/auth/entry/${type}`, type === "log_in" ? log_in : sign_up);

      if (token) {
        localStorage.setItem("value", token);
        axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
      }

      dispatch(modalActions.enterReducer({ [`${type}_errors`]: errors }));

      if (token)
        type === "log_in"
          ? dispatch(modalActions.clearLogIn())
          : dispatch(modalActions.clearSignUp());

      if (pathname === "/" && errors.ok)
        window.location.replace("/home/modules");
    } catch (err) {
      console.error(err);
    }

    dispatch(modalActions.changeModalLoading({ value: false }));
  });

export const checkField = (type: string) => <ThunkActionApp>(async (
    dispatch,
    getState,
  ) => {
    try {
      const {
        modal: { sign_up },
      } = getState();

      dispatch(modalActions.changeModalLoading({ value: true }));

      const { data } = await axiosInstance.post<SignUpErrors>(
        `/api/auth/check/sign_up`,
        sign_up,
      );

      if (type === "username" || type === "password" || type === "email")
        dispatch(modalActions.checkFieldReducer({ ...data, type }));
    } catch (err) {
      console.error(err);
    }

    dispatch(modalActions.changeModalLoading({ value: false }));
  });
