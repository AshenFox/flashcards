import { setAuthToken } from "@api/axiosInstance";
import {
  authGetUser,
} from "@api/methods";
import { ThunkActionApp } from "@store/store";

import { authActions } from "./slice";

export const authenticate = () => <ThunkActionApp>(async (
  dispatch,
  getState,
) => {
  const pathname = window.location.pathname;
  try {
    dispatch(authActions.changeAuthLoading({ value: true }));

    const token = localStorage.getItem("value");

    if (!token && pathname !== "/") {
      throw new Error("Authentication error - not allowed");
    }

    if (token) {
      setAuthToken(token);
      const data = await authGetUser();

      if (pathname === "/") {
        window.location.replace("/home/modules");
        throw new Error("Authentication error - logged in");
      }

      dispatch(authActions.authenticateReducer(data));
    }
  } catch (err) {
    console.error(err);
    if (pathname !== "/") window.location.replace("/");
    return;
  }

  dispatch(authActions.changeAuthLoading({ value: false }));
});

export const logOut = () => <ThunkActionApp>((dispatch, getState) => {
  const pathname = window.location.pathname;

  localStorage.removeItem("value");
  setAuthToken(undefined);

  if (pathname !== "/") window.location.replace("/");

  dispatch(authActions.logOutReducer());
});
