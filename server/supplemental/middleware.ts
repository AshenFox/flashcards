import config from "config";
import { NextFunction, Request } from "express";
import jwt from "jsonwebtoken";

import { ResponseLocals } from "../@types/types";
import userModel from "../models/user_model";

type TAuthMiddleRes = ResponseLocals<{ msg: string }>;

const auth = async (req: Request, res: TAuthMiddleRes, next: NextFunction) => {
  // Get token from headers
  const header = req.header("Authorization");
  const token = header && header.split(" ")[1];

  if (!header || !token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const { _id } = jwt.verify(token, config.get("jwtSecret")) as {
      _id: string;
    };

    const user = await userModel.findOne({
      _id,
    });

    if (!user) throw new Error(`User ${_id} has not been found.`);

    res.locals.user = user;

    next();
  } catch (err) {
    res.status(401).json({ msg: err?.message || "Token is not valid" });
  }
};

const middleware = { auth };

export default middleware;
