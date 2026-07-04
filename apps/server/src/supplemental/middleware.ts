import queryString from "query-string";

import { ResponseLocals } from "./types";

export const query = async (
  req: import("express").Request,
  res: ResponseLocals,
  next: import("express").NextFunction,
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

