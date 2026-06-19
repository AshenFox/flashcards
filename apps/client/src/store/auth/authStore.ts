import { authLogIn, authLogOut, authSignUp } from "@api/methods";
import { queryClient } from "@api/queryClient";
import {
  type AuthResponse,
  DEFAULT_AUTHED_PATH,
  PUBLIC_LANDING_PATH,
} from "@flashcards/common";
import { createStoreHook, withActionName } from "@store/helpers";
import { useLayoutStore } from "@store/layout";
import type { Slice } from "@store/types";
import { saveLastUpdate } from "@utils/saveLastUpdate";
import Router from "next/router";

import type { AuthActionResult, AuthStore } from "./types";

export type { AuthStore } from "./types";

const initialState = {
  user: null as AuthStore["user"],
};

export const authSlice: Slice<AuthStore> = setAction => {
  const set = withActionName<AuthStore>(setAction);

  // Tear down all client-side session state. Shared by an explicit logOut and
  // by the 401 interceptor when the session expires/revokes mid-use, so both
  // paths clean up identically (user, query cache, open dropdown).
  const clearSession = (label: string) => {
    set(state => {
      state.user = null;
    }, label);
    queryClient.clear();
    useLayoutStore.getState().setDropdownActive(false);
    // Broadcast to other tabs (via the storage event TabUpdateController listens
    // for) so they reload and pick up the now-cleared session cookie.
    saveLastUpdate();
  };

  // Shared tail of logIn/signUp: persist the user and redirect, or surface the
  // server-side field errors.
  const applyAuthResult = (
    { user, fieldErrors }: AuthResponse,
    label: string,
  ): AuthActionResult => {
    if (!user) return { success: false as const, fieldErrors: fieldErrors ?? {} };

    set(state => {
      state.user = user;
    }, label);

    // Broadcast to other tabs so they reload into the new session.
    saveLastUpdate();

    void Router.replace(DEFAULT_AUTHED_PATH);

    return { success: true as const };
  };

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
    clearSession: () => clearSession("clearSession"),
    logOut: async () => {
      // The httpOnly cookie is the source of truth, so clear it server-side
      // first. If that fails, keep the user logged in rather than faking a
      // logout that the next navigation's guard would silently undo.
      try {
        await authLogOut();
      } catch (err) {
        console.error(err);
        return;
      }

      clearSession("logOut");

      if (window.location.pathname !== PUBLIC_LANDING_PATH)
        void Router.replace(PUBLIC_LANDING_PATH);
    },
    logIn: async (credentials): Promise<AuthActionResult> =>
      applyAuthResult(await authLogIn(credentials), "logIn"),
    signUp: async (data): Promise<AuthActionResult> =>
      applyAuthResult(await authSignUp(data), "signUp"),
  };
};

export const useAuthStore = createStoreHook({
  storeName: "Auth",
  instanceKey: "auth",
  slice: authSlice,
});
