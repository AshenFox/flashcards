import axios from "@common/axios";

import {
  CHANGE_MODAL_LOADING,
  CHECK_FIELD,
  CLEAR_LOG_IN,
  CLEAR_SIGN_UP,
  ENTER,
} from "../types";
import { LogInErrors, SignUpErrors } from "./../reducers/modal/modalInitState";
import { ThunkActionApp } from "./../store";

// ENTER
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

      dispatch({
        type: CHANGE_MODAL_LOADING,
        payload: true,
      });

      const {
        data: { token, errors },
      }: {
        data: {
          token: string;
          errors: LogInErrors | SignUpErrors;
        };
      } = await axios.post(
        `/api/auth/entry/${type}`,
        type === "log_in" ? log_in : sign_up,
      );

      if (token) {
        localStorage.setItem("value", token);
        axios.defaults.headers.Authorization = `Bearer ${token}`;
      }

      dispatch({
        type: ENTER,
        payload: { [`${type}_errors`]: errors },
      });

      if (token)
        type === "log_in"
          ? dispatch({ type: CLEAR_LOG_IN })
          : dispatch({ type: CLEAR_SIGN_UP });

      if (pathname === "/" && errors.ok)
        window.location.replace("/home/modules");
    } catch (err) {
      console.error(err);
    }

    dispatch({
      type: CHANGE_MODAL_LOADING,
      payload: false,
    });
  });

// CHECK_FIELD
export const check_field = (type: string) => <ThunkActionApp>(async (
    dispatch,
    getState,
  ) => {
    try {
      const {
        modal: { sign_up },
      } = getState();

      dispatch({
        type: CHANGE_MODAL_LOADING,
        payload: true,
      });

      const { data }: { data: SignUpErrors } = await axios.post(
        `/api/auth/check/sign_up`,
        sign_up,
      );

      if (type === "username" || type === "password" || type === "email")
        dispatch({
          type: CHECK_FIELD,
          payload: {
            ...data,
            type,
          },
        });
    } catch (err) {
      console.error(err);
    }

    dispatch({
      type: CHANGE_MODAL_LOADING,
      payload: false,
    });
  });
