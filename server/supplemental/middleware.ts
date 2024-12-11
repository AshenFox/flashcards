import userModel from "@models/user_model";
import config from "config";
import { NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import queryString from "query-string";

import { ResponseLocals } from "./types";

type AuthMiddleRes = ResponseLocals<{ msg: string }>;

const auth = async (req: Request, res: AuthMiddleRes, next: NextFunction) => {
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
  } catch (err: any) {
    res.status(401).json({ msg: err?.message ?? "Token is not valid" });
  }
};

const query = async (req: Request, res: ResponseLocals, next: NextFunction) => {
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

const middleware = { auth, query };

export default middleware;
