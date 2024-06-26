import express, { Request, Response } from "express";

import client_interface from "../supplemental/client_interface";
import middleware from "../supplemental/middleware";

const { auth } = middleware;
const router = express.Router();

// @route ------ GET api/imgsearch
// @desc ------- Search images on google by query
// @access ----- Private

type TGetRes = Response<any | { errorBody: string }>;

router.get("/", auth, async (req: Request, res: TGetRes) => {
  try {
    const { query } = req.query;

    if (!query) {
      res.status(400).json({ errorBody: "Bad Request" });
      return;
    }

    //@ts-ignore
    const searchResults = await client_interface.search(query);

    if (!searchResults) {
      res.status(503).json({ errorBody: "Service Unavailable" });
      return;
    }

    res.status(200).json(searchResults);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorBody: "Server Error" });
  }
});

export default router;
