import { env } from "@setup";
import type { CookieOptions } from "express";

/** Shared attributes for the session cookie (used when setting and clearing). */
export const sessionCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: env.NODE_ENV === "production",
  path: "/",
};

