import type { UserDto } from "@flashcards/common";
import type { AppContext } from "next/app";

export type InitialAuthUser = UserDto | null | undefined;

/**
 * The Express auth guard resolves the session for SSR requests and attaches it
 * to req.user. Client navigations have no ctx.req, so undefined means preserve
 * the existing client store.
 */
export const getInitialAuthUser = (
  ctx: AppContext["ctx"],
): InitialAuthUser => (ctx.req ? ctx.req.user ?? null : undefined);
