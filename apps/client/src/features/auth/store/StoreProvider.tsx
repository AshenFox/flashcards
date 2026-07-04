import {
  isProtectedPath,
  PUBLIC_LANDING_PATH,
  type UserDto,
} from "@flashcards/common";
import Router from "next/router";
import { createContext, ReactNode, useContext, useEffect, useRef } from "react";
import { useStore } from "zustand";

import { type AuthStoreApi, createAuthStore } from "./createAuthStore";
import { setAuthStoreRef } from "./storeRef";
import type { AuthStore } from "./types";

const AuthStoreContext = createContext<AuthStoreApi | null>(null);

type AuthStoreProviderProps = {
  initialUser: UserDto | null | undefined;
  children: ReactNode;
};

export const AuthStoreProvider = ({
  initialUser,
  children,
}: AuthStoreProviderProps) => {
  const storeRef = useRef<AuthStoreApi | null>(null);

  if (!storeRef.current) {
    storeRef.current = createAuthStore(initialUser ?? null);
    if (typeof window !== "undefined") setAuthStoreRef(storeRef.current);
  }

  useEffect(() => {
    const store = storeRef.current;
    if (!store) return;

    const onRouteChangeStart = (url: string) => {
      const path = url.split("?")[0];
      if (isProtectedPath(path) && !store.getState().user)
        void Router.replace(PUBLIC_LANDING_PATH);
    };

    Router.events.on("routeChangeStart", onRouteChangeStart);
    return () => Router.events.off("routeChangeStart", onRouteChangeStart);
  }, []);

  return (
    <AuthStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreContext.Provider>
  );
};

export function useAuthStore<T>(selector: (state: AuthStore) => T): T {
  const store = useContext(AuthStoreContext);
  if (!store)
    throw new Error("useAuthStore must be used within an AuthStoreProvider");
  return useStore(store, selector);
}

