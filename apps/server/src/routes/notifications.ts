import { Subscription, Subscriptions } from "@serverTypes/entities";
import { auth } from "@supplemental/middleware";
import { ResponseLocals } from "@supplemental/types";
import express, { Request } from "express";
import { Types } from "mongoose";
import { PushSubscription } from "web-push";

const router = express.Router();

type ResError = {
  errorBody: string;
};

// @route ------ POST api/notifications/subscribe
// @desc ------- Create new subscription
// @access ----- Private

type SubscribePutBody = {
  name: string;
  subscription: PushSubscription;
};

type SubscribePutReq = Request<any, any, SubscribePutBody>;

type SubscribePutResBody = Subscription;

type SubscribePutRes = ResponseLocals<SubscribePutResBody | ResError>;

router.post(
  "/subscribe",
  auth,
  async (req: SubscribePutReq, res: SubscribePutRes) => {
    try {
      const { name, subscription } = req.body;
      const user = res.locals.user;

      // Check if subscription with this endpoint already exists
      const existingSubscription = user.subscriptions.find(
        sub => sub.subscriptionData.endpoint === subscription.endpoint,
      );

      if (existingSubscription) {
        res.status(409).json({
          errorBody: "Subscription with this endpoint already exists",
        });
        return;
      }

      // Create new subscription
      const newSubscription: Subscription = {
        _id: new Types.ObjectId(),
        name,
        subscriptionDate: new Date(),
        subscriptionData: subscription,
      };

      (user.subscriptions as Subscriptions).push(newSubscription);
      await user.save();

      res.status(201).json(newSubscription);
    } catch (err) {
      console.error(err);
      res.status(500).json({ errorBody: "Server Error" });
    }
  },
);

// @route ------ GET api/notifications/subscriptions
// @desc ------- Get all subscriptions for the user
// @access ----- Private

type GetSubscriptionsResBody = {
  subscriptions: Subscription[];
};

type GetSubscriptionsRes = ResponseLocals<GetSubscriptionsResBody | ResError>;

router.get(
  "/subscriptions",
  auth,
  async (req: Request, res: GetSubscriptionsRes) => {
    try {
      const user = res.locals.user;
      const subscriptions = user.subscriptions as Subscriptions;

      res.status(200).json({ subscriptions });
    } catch (err) {
      console.error(err);
      res.status(500).json({ errorBody: "Server Error" });
    }
  },
);

// @route ------ PUT api/notifications/subscription/:id
// @desc ------- Update a specific subscription
// @access ----- Private

type UpdateSubscriptionBody = {
  name?: string;
};

type UpdateSubscriptionReq = Request<
  { id: string },
  any,
  UpdateSubscriptionBody
>;

type UpdateSubscriptionResBody = Subscription;

type UpdateSubscriptionRes = ResponseLocals<
  UpdateSubscriptionResBody | ResError
>;

router.put(
  "/subscription/:id",
  auth,
  async (req: UpdateSubscriptionReq, res: UpdateSubscriptionRes) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const user = res.locals.user;

      const subscription = (user.subscriptions as Subscriptions).find(
        (sub: Subscription) => sub._id.toString() === id,
      );

      if (!subscription) {
        res.status(404).json({ errorBody: "Subscription not found" });
        return;
      }

      if (name) {
        subscription.name = name;
        subscription.subscriptionDate = new Date();
      }

      await user.save();
      res.status(200).json(subscription);
    } catch (err) {
      console.error(err);
      res.status(500).json({ errorBody: "Server Error" });
    }
  },
);

// @route ------ DELETE api/notifications/subscription/:id
// @desc ------- Delete a specific subscription
// @access ----- Private

type DeleteSubscriptionReq = Request<{ id: string }>;

type DeleteSubscriptionResBody = {
  msg: string;
};

type DeleteSubscriptionRes = ResponseLocals<
  DeleteSubscriptionResBody | ResError
>;

router.delete(
  "/subscription/:id",
  auth,
  async (req: DeleteSubscriptionReq, res: DeleteSubscriptionRes) => {
    try {
      const { id } = req.params;
      const user = res.locals.user;

      const subscriptionIndex = (user.subscriptions as Subscriptions).findIndex(
        (sub: Subscription) => sub._id.toString() === id,
      );

      if (subscriptionIndex === -1) {
        res.status(404).json({ errorBody: "Subscription not found" });
        return;
      }

      (user.subscriptions as Subscriptions).splice(subscriptionIndex, 1);
      await user.save();

      res.status(200).json({ msg: "Subscription has been deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ errorBody: "Server Error" });
    }
  },
);

export default router;
