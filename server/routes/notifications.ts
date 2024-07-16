import express, { Request, Response } from "express";
import { PushSubscription } from "web-push";

import userModel from "../models/user_model";
import middleware from "../supplemental/middleware";

const { auth } = middleware;

const router = express.Router();

interface IResError {
  errorBody: string;
}

// @route ------ PUT api/notifications/subscribe
// @desc ------- Update subscription
// @access ----- Private

// "mobile" | "tablet" | "pc"

interface ISubscribePutBody {
  device: "mobile" | "tablet" | "pc";
  subscription: PushSubscription;
}

type TSubscribePutReq = Request<any, any, ISubscribePutBody>;

interface ISubscribePutResBody {
  msg: string;
}

type TSubscribePutRes = Response<ISubscribePutResBody | IResError>;

router.put(
  "/subscribe",
  auth,
  async (req: TSubscribePutReq, res: TSubscribePutRes) => {
    try {
      const { device, subscription } = req.body;

      const server_id = req.user.server_id;

      const user = await userModel.findOne({
        server_id,
      });

      if (!user) throw new Error(`User ${server_id} has not been found.`);

      if (
        !user.subscriptions[device] ||
        !(user.subscriptions[device].endpoint === subscription.endpoint)
      ) {
        user.subscriptions[device] = subscription;
        await user.save();

        res.status(200).json({ msg: "Subscription has been updated" });
        return;
      }

      res.status(200).json({ msg: "Subscription is actual" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ errorBody: "Server Error" });
    }
  },
);

export default router;
