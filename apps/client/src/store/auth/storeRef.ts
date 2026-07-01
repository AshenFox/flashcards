import type { AuthStoreApi } from "./createAuthStore";

// Client-only handle to the per-request auth store, so non-React code (the axios
// 401 interceptor) can tear down the session without a global store. Registered
// by AuthStoreProvider on mount. On the server each request builds its own store
// and never touches this ref.
let authStore: AuthStoreApi | null = null;

export const setAuthStoreRef = (store: AuthStoreApi | null) => {
  authStore = store;
};

export const getAuthStore = (): AuthStoreApi | null => authStore;
