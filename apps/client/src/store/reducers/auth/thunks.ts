import { UserDto } from "@flashcards/common";
import { axiosInstance } from "@flashcards/common";
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
        axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
        const { data } = await axiosInstance.get<UserDto>(`/api/auth`);

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
    axiosInstance.defaults.headers.Authorization = undefined;

    if (pathname !== "/") window.location.replace("/");

    dispatch(authActions.logOutReducer());
  });
