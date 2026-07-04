import type { AuthStoreApi } from "./createAuthStore";

let authStore: AuthStoreApi | null = null;

export const setAuthStoreRef = (store: AuthStoreApi | null) => {
  authStore = store;
};

export const getAuthStore = (): AuthStoreApi | null => authStore;

