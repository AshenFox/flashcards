import {
  DEFAULT_AUTHED_PATH,
  isProtectedPath,
  PUBLIC_LANDING_PATH,
  PUBLIC_ONLY_PATHS,
  SESSION_COOKIE,
  toUserDto,
  UserDto,
} from "@flashcards/common";
import userModel from "@models/user_model";
import { env } from "@setup";
import { CookieOptions, NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import queryString from "query-string";

import { ResponseLocals } from "./types";

type AuthMiddleRes = ResponseLocals<{ msg: string }>;

/** Shared attributes for the session cookie (used when setting and clearing). */
export const sessionCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: env.NODE_ENV === "production",
  path: "/",
};

/**
 * Resolve the current user from a session token: verify the signature, then
 * load the user. Returns the JSON-safe UserDto, or null when the token is
 * missing/invalid/expired or the user no longer exists (e.g. deleted account).
 *
 * Used by the route guard to both decide redirects and hand the resolved user
 * to Next's `getInitialProps` on the same request — no second HTTP hop or DB
 * lookup needed.
 */
export const resolveUser = async (
  token: string | undefined,
): Promise<UserDto | null> => {
  if (!token) return null;
  try {
    const { _id } = jwt.verify(token, env.JWT_SECRET) as { _id: string };
    const user = await userModel.findOne({ _id });
    return user ? toUserDto(user) : null;
  } catch {
    return null;
  }
};

/**
 * True for requests that aren't app page navigations — Next internals and
 * static assets (anything with a file extension). These never need session
 * resolution or redirects, so the guard skips them before any DB work.
 */
const isNonPageRequest = (pathname: string): boolean =>
  pathname.startsWith("/_next") || pathname.includes(".");

/**
 * Auth route guard, run on every GET before Next renders. Two responsibilities,
 * intentionally decoupled:
 *
 *  - Redirects use the route classification (PUBLIC_ONLY_PATHS / isProtectedPath)
 *    to bounce authed users off public-only pages and anonymous users off
 *    protected ones.
 *  - Seeding always attaches the resolved user to req.user (whenever a valid
 *    session cookie is present), regardless of classification, so SSR renders
 *    the right chrome even on a page that isn't in either list. (req.user is
 *    typed via the http.IncomingMessage augmentation in src/types/http.d.ts.)
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

    // A token that no longer resolves (expired, or the user was deleted) is dead
    // weight — scrub it so it stops being replayed. This runs on the real browser
    // request, so the Set-Cookie actually reaches the client.
    if (token && !user) res.clearCookie(SESSION_COOKIE, sessionCookieOptions);

    if (user && PUBLIC_ONLY_PATHS.includes(req.path))
      return res.redirect(302, DEFAULT_AUTHED_PATH);
    if (!user && isProtectedPath(req.path))
      return res.redirect(302, PUBLIC_LANDING_PATH);

    req.user = user;
    next();
  } catch (err) {
    // Never let a guard failure hang the request — fall through to Next so the
    // page still renders (worst case without a seeded user).
    console.error(err);
    next();
  }
};

export const auth = async (
  req: Request,
  res: AuthMiddleRes,
  next: NextFunction,
) => {
  // Prefer the httpOnly session cookie; fall back to the Authorization header.
  const token =
    req.cookies?.[SESSION_COOKIE] ?? req.header("Authorization")?.split(" ")[1];

  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const { _id } = jwt.verify(token, env.JWT_SECRET) as {
      _id: string;
    };

    const user = await userModel.findOne({
      _id,
    });

    if (!user) throw new Error(`User ${_id} has not been found.`);

    res.locals.user = user;

    next();
  } catch (err: any) {
    // The token verified but is no longer usable (e.g. the user was deleted),
    // or it's malformed. Scrub the stale cookie so it stops being replayed.
    res.clearCookie(SESSION_COOKIE, sessionCookieOptions);
    res.status(401).json({ msg: err?.message ?? "Token is not valid" });
  }
};

export const query = async (
  req: Request,
  res: ResponseLocals,
  next: NextFunction,
) => {
  try {
    const rawQuery = req.originalUrl.split("?")[1];

    const parsedQuery = queryString.parse(rawQuery, {
      parseNumbers: true,
      parseBooleans: true,
    });

    res.locals.query = parsedQuery;

    next();
  } catch (err: any) {
    res.status(500).json({ msg: err?.message ?? "Query parsing error" });
  }
};
