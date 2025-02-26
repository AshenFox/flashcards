import userModel from "@models/user_model";
import { User } from "@serverTypes/entities";
import { check, CheckResult } from "@supplemental/checks";
import { auth } from "@supplemental/middleware";
import { ResponseLocals } from "@supplemental/types";
import bcrypt from "bcryptjs";
import config from "config";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

type ResError = {
  errorBody: string;
};

// @route ------ POST api/auth/check/:type
// @desc ------- Check form data of certain type
// @access ----- Public

type CheckPostParams = {
  type: "log_in" | "sign_up";
};

type CheckPostReq = Request<CheckPostParams>;
type CheckPostRes = Response<CheckResult | ResError>;

router.post("/check/:type", async (req: CheckPostReq, res: CheckPostRes) => {
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

type EntryPostParams = {
  type: "log_in" | "sign_up";
};

type EntryPostReqBody = {
  username: string;
  email: string;
  password: string;
};

type EntryPostReq = Request<EntryPostParams, any, EntryPostReqBody>;

type EntryPostResBody = {
  errors: CheckResult;
  token?: string;
};

type EntryPostRes = Response<EntryPostResBody | ResError>;

router.post("/entry/:type", async (req: EntryPostReq, res: EntryPostRes) => {
  try {
    const { type } = req.params;

    const errors = await check(req.body, type);

    const { username, email, password } = req.body;

    const res_data: EntryPostResBody = { errors };

    if (errors.ok) {
      let user: User | null = null;

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
