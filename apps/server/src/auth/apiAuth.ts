import { SESSION_COOKIE } from "@flashcards/common";
import userModel from "@models/user_model";
import { env } from "@setup";
import type { ResponseLocals } from "@supplemental/types";
import type { NextFunction, Request } from "express";
import jwt from "jsonwebtoken";

import { sessionCookieOptions } from "./cookies";

type AuthMiddleRes = ResponseLocals<{ msg: string }>;

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

    const user = await userModel.findOne({ _id });

    if (!user) throw new Error(`User ${_id} has not been found.`);

    res.locals.user = user;

    next();
  } catch (err: any) {
    res.clearCookie(SESSION_COOKIE, sessionCookieOptions);
    res.status(401).json({ msg: err?.message ?? "Token is not valid" });
  }
};

