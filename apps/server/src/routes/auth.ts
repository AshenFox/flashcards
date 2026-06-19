import {
  type AuthResponse,
  SESSION_COOKIE,
  SESSION_MAX_AGE_S,
  toUserDto,
} from "@flashcards/common";
import userModel from "@models/user_model";
import { env } from "@setup";
import { validateLogIn, validateSignUp } from "@supplemental/checks";
import { sessionCookieOptions } from "@supplemental/middleware";
import bcrypt from "bcryptjs";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

type ResError = {
  errorBody: string;
};

// @route ------ POST api/auth/sign_up
// @desc ------- Sign up a user
// @access ----- Public

type SignUpPostReqBody = {
  username: string;
  email: string;
  password: string;
};

type SignUpPostReq = Request<unknown, unknown, SignUpPostReqBody>;
type SignUpPostRes = Response<AuthResponse | ResError>;

router.post("/sign_up", async (req: SignUpPostReq, res: SignUpPostRes) => {
  try {
    const validation = await validateSignUp(req.body);

    if (!validation.success) {
      res.status(200).json({ fieldErrors: validation.fieldErrors });
      return;
    }

    const { username, email, password } = validation.data;

    const user = await userModel.create({
      username,
      email,
      registration_date: new Date(),
      password: await bcrypt.hash(password, 10),
    });

    console.log("A new user has been signed up!");

    const token = jwt.sign({ _id: user._id }, env.JWT_SECRET);

    console.log("A user has logged in!");

    res.cookie(SESSION_COOKIE, token, {
      ...sessionCookieOptions,
      maxAge: SESSION_MAX_AGE_S * 1000,
    });

    res.status(200).json({ user: toUserDto(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorBody: "Server Error" });
  }
});

// @route ------ POST api/auth/log_in
// @desc ------- Log in a user
// @access ----- Public

type LogInPostReqBody = {
  username: string;
  password: string;
};

type LogInPostReq = Request<unknown, unknown, LogInPostReqBody>;
type LogInPostRes = Response<AuthResponse | ResError>;

router.post("/log_in", async (req: LogInPostReq, res: LogInPostRes) => {
  try {
    const validation = await validateLogIn(req.body);

    if (!validation.success) {
      res.status(200).json({ fieldErrors: validation.fieldErrors });
      return;
    }

    const { username } = validation.data;

    const user = await userModel.findOne({ username });

    if (!user) throw new Error("The user has not been found.");

    const token = jwt.sign({ _id: user._id }, env.JWT_SECRET);

    console.log("A user has logged in!");

    res.cookie(SESSION_COOKIE, token, {
      ...sessionCookieOptions,
      maxAge: SESSION_MAX_AGE_S * 1000,
    });

    res.status(200).json({ user: toUserDto(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorBody: "Server Error" });
  }
});

// @route ------ POST api/auth/log_out
// @desc ------- Clear the session cookie
// @access ----- Public

router.post("/log_out", (_req: Request, res: Response) => {
  res.clearCookie(SESSION_COOKIE, sessionCookieOptions);
  res.status(200).json({ success: true });
});

export default router;
