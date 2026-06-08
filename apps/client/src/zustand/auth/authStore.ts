import { setAuthToken } from "@api/axiosInstance";
import { queryClient } from "@api/queryClient";
import { createStoreHook, withActionName } from "@zustand/helpers";
import { useLayoutStore } from "@zustand/layout";

import type { Slice } from "../types";
import type { AuthStore } from "./types";

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
  };
};

export const useAuthStore = createStoreHook({
  storeName: "Auth",
  instanceKey: "auth",
  slice: authSlice,
});
