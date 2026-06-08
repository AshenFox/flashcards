import { setAuthToken } from "@api/axiosInstance";
import { authGetUser } from "@api/methods";
import { UserDto } from "@flashcards/common";

import { clearAuthCredentials, useAuthStore } from "./authStore";

function redirect(url: string): void {
  window.location.replace(url);
}

export async function bootstrapSession(): Promise<UserDto | null> {
  const pathname = window.location.pathname;
  const token = localStorage.getItem("value");
  const { setUser, clearUser } = useAuthStore.getState();

  if (!token) {
    clearUser();
    if (pathname !== "/") redirect("/");
    return null;
  }

  try {
    setAuthToken(token);
    const user = await authGetUser();

    setUser(user);
    if (pathname === "/") {
      redirect("/home/modules");
      return null;
    }

    return user;
  } catch (err) {
    console.error(err);
    clearAuthCredentials();
    clearUser();

    if (pathname !== "/") redirect("/");

    return null;
  }
}
