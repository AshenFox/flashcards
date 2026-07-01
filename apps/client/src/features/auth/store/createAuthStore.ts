import { queryClient } from "@api/queryClient";
import {
  type AuthResponse,
  DEFAULT_AUTHED_PATH,
  PUBLIC_LANDING_PATH,
  type UserDto,
} from "@flashcards/common";
import { withActionName } from "@store/helpers";
import { useLayoutStore } from "@store/layout";
import type { Slice } from "@store/types";
import { saveLastUpdate } from "@utils/saveLastUpdate";
import Router from "next/router";
import { createStore } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { authLogIn, authLogOut, authSignUp } from "../api";
import type { AuthActionResult, AuthStore } from "./types";

const createAuthSlice =
  (initialUser: UserDto | null): Slice<AuthStore> =>
  setAction => {
    const set = withActionName<AuthStore>(setAction);

    const clearSession = (label: string) => {
      set(state => {
        state.user = null;
      }, label);
      queryClient.clear();
      useLayoutStore.getState().setDropdownActive(false);
      saveLastUpdate();
    };

    const applyAuthResult = (
      { user, fieldErrors }: AuthResponse,
      label: string,
    ): AuthActionResult => {
      if (!user)
        return { success: false as const, fieldErrors: fieldErrors ?? {} };

      set(state => {
        state.user = user;
      }, label);

      saveLastUpdate();

      void Router.replace(DEFAULT_AUTHED_PATH);

      return { success: true as const };
    };

    return {
      user: initialUser,
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

export const createAuthStore = (initialUser: UserDto | null) => {
  const storeWithImmer = immer(createAuthSlice(initialUser));

  if (process.env.NODE_ENV === "development")
    return createStore<AuthStore>()(
      devtools(storeWithImmer, { name: "Auth: auth" }),
    );

  return createStore<AuthStore>()(storeWithImmer);
};

export type AuthStoreApi = ReturnType<typeof createAuthStore>;

