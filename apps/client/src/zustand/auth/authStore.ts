import { setAuthToken } from "@api/axiosInstance";
import { authEntry, authGetUser } from "@api/methods";
import { queryClient } from "@api/queryClient";
import { createStoreHook, withActionName } from "@zustand/helpers";
import { useLayoutStore } from "@zustand/layout";

import type { Slice } from "../types";
import type { AuthStore, LogInErrors, SignUpErrors } from "./types";

export type { AuthStore } from "./types";

export function clearAuthCredentials() {
  localStorage.removeItem("value");
  setAuthToken(undefined);
}

const initialState = {
  user: null as AuthStore["user"],
};

export const authSlice: Slice<AuthStore> = setAction => {
  const set = withActionName<AuthStore>(setAction);

  return {
    ...initialState,
    setUser: user =>
      set(state => {
        state.user = user;
      }, "setUser"),
    clearUser: () =>
      set(state => {
        state.user = null;
      }, "clearUser"),
    logOut: () => {
      set(state => {
        state.user = null;
      }, "logOut");

      queryClient.clear();

      clearAuthCredentials();
      useLayoutStore.getState().setDropdownActive(false);

      const pathname = window.location.pathname;
      if (pathname !== "/") window.location.replace("/");
    },
    logIn: async credentials => {
      const { token, errors } = await authEntry<LogInErrors>(
        "log_in",
        credentials,
      );

      if (!token) return errors;

      try {
        localStorage.setItem("value", token);
        setAuthToken(token);
        const user = await authGetUser();
        set(state => {
          state.user = user;
        }, "logIn");

        if (window.location.pathname === "/") {
          window.location.replace("/home/modules");
        }
      } catch (err) {
        clearAuthCredentials();
        console.error(err);
        throw err;
      }

      return errors;
    },
    signUp: async data => {
      const { token, errors } = await authEntry<SignUpErrors>("sign_up", data);

      if (!token) return errors;

      try {
        localStorage.setItem("value", token);
        setAuthToken(token);
        const user = await authGetUser();
        set(state => {
          state.user = user;
        }, "signUp");

        if (window.location.pathname === "/") {
          window.location.replace("/home/modules");
        }
      } catch (err) {
        clearAuthCredentials();
        console.error(err);
        throw err;
      }

      return errors;
    },
  };
};

export const useAuthStore = createStoreHook({
  storeName: "Auth",
  instanceKey: "auth",
  slice: authSlice,
});
