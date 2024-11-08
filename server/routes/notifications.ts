import middleware from "@supplemental/middleware";
import { ResponseLocals } from "@supplemental/types";
import express, { Request } from "express";
import { PushSubscription } from "web-push";

const { auth } = middleware;

const router = express.Router();

type ResError = {
  errorBody: string;
};

// @route ------ PUT api/notifications/subscribe
// @desc ------- Update subscription
// @access ----- Private

// "mobile" | "tablet" | "pc"

type SubscribePutBody = {
  device: "mobile" | "tablet" | "pc";
  subscription: PushSubscription;
};

type SubscribePutReq = Request<any, any, SubscribePutBody>;

type SubscribePutResBody = {
  msg: string;
};

type SubscribePutRes = ResponseLocals<SubscribePutResBody | ResError>;

router.put(
  "/subscribe",
  auth,
  async (req: SubscribePutReq, res: SubscribePutRes) => {
    try {
      const { device, subscription } = req.body;

      const user = res.locals.user;

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
