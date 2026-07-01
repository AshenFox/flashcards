import {
  DEFAULT_AUTHED_PATH,
  isProtectedPath,
  PUBLIC_LANDING_PATH,
  PUBLIC_ONLY_PATHS,
  SESSION_COOKIE,
} from "@flashcards/common";
import type { NextFunction, Request, Response } from "express";

import { sessionCookieOptions } from "./cookies";
import { resolveUser } from "./session";

/**
 * True for requests that aren't app page navigations: Next internals and static
 * assets (anything with a file extension). These never need session resolution.
 */
const isNonPageRequest = (pathname: string): boolean =>
  pathname.startsWith("/_next") || pathname.includes(".");

/**
 * Auth route guard, run on every GET before Next renders. Redirects page
 * requests and seeds req.user for getInitialProps.
 */
export const guard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (isNonPageRequest(req.path)) return next();

    const token = req.cookies?.[SESSION_COOKIE];
    const user = await resolveUser(token);

    if (token && !user) res.clearCookie(SESSION_COOKIE, sessionCookieOptions);

    if (user && PUBLIC_ONLY_PATHS.includes(req.path))
      return res.redirect(302, DEFAULT_AUTHED_PATH);
    if (!user && isProtectedPath(req.path))
      return res.redirect(302, PUBLIC_LANDING_PATH);

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    next();
  }
};

