import { PUBLIC_LANDING_PATH } from "@flashcards/common";
import axios, { AxiosInstance } from "axios";
import Router from "next/router";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "/api/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// The session lives in an httpOnly cookie that the browser sends automatically
// on same-origin requests, so no Authorization header is injected here.
// If the session expires or is revoked mid-session, the API responds 401 — we
// tear down local auth state (same teardown as an explicit logout) and send the
// user back to the public landing page.
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error?.response?.status === 401 && typeof window !== "undefined") {
      // Lazy import to avoid a cycle (this module is pulled in by the store's
      // api methods). getAuthStore() returns the per-request store registered by
      // AuthStoreProvider on mount.
      void import("@store/auth").then(({ getAuthStore }) =>
        getAuthStore()?.getState().clearSession(),
      );
      if (Router.pathname !== PUBLIC_LANDING_PATH)
        void Router.replace(PUBLIC_LANDING_PATH);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
