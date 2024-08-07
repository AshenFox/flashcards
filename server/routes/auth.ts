import bcrypt from "bcryptjs";
import config from "config";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { ResponseLocals } from "../@types/types";
import userModel from "../models/user_model";
import { check, ICheckResult } from "../supplemental/checks";
import middleware from "../supplemental/middleware";
import { IUser } from "./../models/user_model";

const { auth } = middleware;

const router = express.Router();

interface IResError {
  errorBody: string;
}

// @route ------ POST api/auth/check/:type
// @desc ------- Check form data of certain type
// @access ----- Public

interface ICheckPostParams {
  type: "log_in" | "sign_up";
}

type TCheckPostReq = Request<ICheckPostParams>;
type TCheckPostRes = Response<ICheckResult | IResError>;

router.post("/check/:type", async (req: TCheckPostReq, res: TCheckPostRes) => {
  try {
    const { type } = req.params;
    const errors = await check(req.body, type);
    res.status(200).json(errors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorBody: "Server Error" });
  }
});

// @route ------ POST api/auth/entry/:type
// @desc ------- Entry a user
// @access ----- Public

interface IEntryPostParams {
  type: "log_in" | "sign_up";
}

interface IEntryPostReqBody {
  username: string;
  email: string;
  password: string;
}

type TEntryPostReq = Request<IEntryPostParams, any, IEntryPostReqBody>;

interface IEntryPostResBody {
  errors: ICheckResult;
  token?: string;
}

type TEntryPostRes = Response<IEntryPostResBody | IResError>;

router.post("/entry/:type", async (req: TEntryPostReq, res: TEntryPostRes) => {
  try {
    const { type } = req.params;

    const errors = await check(req.body, type);

    const { username, email, password } = req.body;

    const res_data: IEntryPostResBody = { errors };

    if (errors.ok) {
      let user: IUser | null = null;

      if (type === "log_in") {
        user = await userModel.findOne({
          username,
        });
      } else if (type === "sign_up") {
        const user_data = {
          username,
          email,
          registration_date: new Date(),
          password: "",
        };

        user_data.password = await bcrypt.hash(password, 10);

        user = await userModel.create(user_data);

        console.log("A new user has been signed up!");
      }

      if (!user) throw new Error("The user has not been found.");

      const _id = user._id;

      const token = jwt.sign({ _id }, config.get("jwtSecret"));

      res_data.token = token;

      console.log(`A user has logged in!`);
    }

    res.status(200).json(res_data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorBody: "Server Error" });
  }
});

// @route ------ GET api/auth
// @desc ------- Authenticate
// @access ----- Private

type TAuthGetRes = ResponseLocals<IUser | IResError | null>;

router.get("/", auth, async (req: Request, res: TAuthGetRes) => {
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
