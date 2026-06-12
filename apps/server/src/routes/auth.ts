import { type AuthResponse, User } from "@flashcards/common";
import userModel from "@models/user_model";
import { env } from "@setup";
import { validateLogIn, validateSignUp } from "@supplemental/checks";
import { auth } from "@supplemental/middleware";
import { ResponseLocals } from "@supplemental/types";
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

    res.status(200).json({ token });
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

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorBody: "Server Error" });
  }
});

// @route ------ GET api/auth
// @desc ------- Authenticate
// @access ----- Private

type AuthGetRes = ResponseLocals<User | ResError | null>;

router.get("/", auth, async (req: Request, res: AuthGetRes) => {
  try {
    const _id = res.locals.user._id;

    const user = await userModel.findOne({
      _id,
    });

    if (user) user.password = "";

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorBody: "Server Error" });
  }
});

export default router;
