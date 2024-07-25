import middleware from "@supplemental/middleware";
import { ResponseLocals } from "@supplemental/types";
import express, { Request } from "express";
import { PushSubscription } from "web-push";

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

type TSubscribePutRes = ResponseLocals<ISubscribePutResBody | IResError>;

router.put(
  "/subscribe",
  auth,
  async (req: TSubscribePutReq, res: TSubscribePutRes) => {
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
