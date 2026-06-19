import {
  isProtectedPath,
  PUBLIC_LANDING_PATH,
  type UserDto,
} from "@flashcards/common";
import { useAuthStore } from "@store/auth";
import Router from "next/router";
import { memo, ReactNode, useEffect, useRef } from "react";

type AuthProviderProps = {
  // null = no session; undefined = client-side navigation (don't touch the store)
  initialUser: UserDto | null | undefined;
  children: ReactNode;
};

const seed = (user: UserDto | null) =>
  useAuthStore.setState(state => {
    state.user = user;
  });

const AuthProvider = ({ initialUser, children }: AuthProviderProps) => {
  const hydrated = useRef(false);

  // Seed the auth store from SSR data so the header renders correctly on the
  // first paint — no flash, no hydration mismatch.
  // - Server: runs on every render. This mutates the module-singleton store
  //   during render, which is safe ONLY because pages-router SSR is synchronous
  //   (renderToString never yields) and we re-seed at the top of the tree before
  //   any consumer reads it, so concurrent requests can't interleave between
  //   seed and read. This assumption breaks under the app router / streaming
  //   SSR — move to request-scoped state (context/props) if you migrate.
  // - Client: seed once on initial hydration. Later client navigations pass
  //   initialUser === undefined, so the live store value is preserved.
  if (typeof window === "undefined") {
    if (useAuthStore.getState().user !== (initialUser ?? null))
      seed(initialUser ?? null);
  } else if (!hydrated.current) {
    hydrated.current = true;
    if (initialUser !== undefined) seed(initialUser);
  }

  // Client-side route guard. The Express guard only runs on full GETs, not on
  // next/link / router transitions, so block a client navigation to a protected
  // page when the store has no user (e.g. a back-button hop after logout). This
  // is UX only — the API still enforces auth via 401 — so it just avoids a flash
  // of the protected shell, with no network round-trip. The expired-cookie /
  // stale-user case can't be caught here (the cookie is httpOnly) and is handled
  // by the 401 interceptor instead.
  useEffect(() => {
    const onRouteChangeStart = (url: string) => {
      const path = url.split("?")[0];
      if (isProtectedPath(path) && !useAuthStore.getState().user)
        void Router.replace(PUBLIC_LANDING_PATH);
    };
    Router.events.on("routeChangeStart", onRouteChangeStart);
    return () => Router.events.off("routeChangeStart", onRouteChangeStart);
  }, []);

  return <>{children}</>;
};

export default memo(AuthProvider);
