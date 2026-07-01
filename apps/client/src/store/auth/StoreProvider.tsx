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
  // null = no session. undefined only reaches here on client navigations, but
  // the provider mounts once (per request on the server, per app load on the
  // client) so the store is created exactly once from the initial value and
  // reused thereafter — undefined is simply coalesced to null at creation.
  initialUser: UserDto | null | undefined;
  children: ReactNode;
};

export const AuthStoreProvider = ({
  initialUser,
  children,
}: AuthStoreProviderProps) => {
  const storeRef = useRef<AuthStoreApi | null>(null);

  if (!storeRef.current) {
    // Seeded at creation: this is what makes the SSR/hydration snapshot correct
    // (see createAuthStore). Per-request on the server, so no cross-request bleed.
    storeRef.current = createAuthStore(initialUser ?? null);
    // Bridge for non-React callers (the axios 401 interceptor). Client-only.
    if (typeof window !== "undefined") setAuthStoreRef(storeRef.current);
  }

  // Client-side route guard for next/link transitions (the Express guard only
  // runs on full GETs). Blocks navigation to a protected page when the store has
  // no user — UX only, the API still enforces auth via 401.
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
