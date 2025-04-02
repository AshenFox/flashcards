import { Subscription, Subscriptions } from "@serverTypes/entities";
import { ErrorResponse } from "@serverTypes/methods";
import {
  DeleteNotificationsSubscriptionParams,
  DeleteNotificationsSubscriptionResponse,
  GetNotificationsSubscriptionsResponse,
  PostNotificationsSubscribeQuery,
  PostNotificationsSubscribeResponse,
  PutNotificationsSubscriptionBody,
  PutNotificationsSubscriptionParams,
  PutNotificationsSubscriptionResponse,
} from "@serverTypes/methods";
import { auth } from "@supplemental/middleware";
import { ResponseLocals } from "@supplemental/types";
import express, { Request } from "express";
import { Types } from "mongoose";

const router = express.Router();

// @route ------ POST api/notifications/subscribe
// @desc ------- Create new subscription
// @access ----- Private

type SubscribePostReq = Request<any, any, PostNotificationsSubscribeQuery>;

type SubscribePostRes = ResponseLocals<
  PostNotificationsSubscribeResponse | ErrorResponse
>;

router.post(
  "/subscribe",
  auth,
  async (req: SubscribePostReq, res: SubscribePostRes) => {
    try {
      const { name, subscriptionData } = req.body;
      const user = res.locals.user;

      // Check if subscription with this endpoint already exists
      const existingSubscription = user.subscriptions.find(
        sub => sub.subscriptionData.endpoint === subscriptionData.endpoint,
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
        subscriptionData,
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

type GetSubscriptionsRes = ResponseLocals<
  GetNotificationsSubscriptionsResponse | ErrorResponse
>;

router.get(
  "/subscriptions",
  auth,
  async (req: Request, res: GetSubscriptionsRes) => {
    try {
      const user = res.locals.user;
      const subscriptions = user.subscriptions;

      res.status(200).json(subscriptions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ errorBody: "Server Error" });
    }
  },
);

// @route ------ PUT api/notifications/subscription/:id
// @desc ------- Update a specific subscription
// @access ----- Private

type PutSubscriptionReq = Request<
  PutNotificationsSubscriptionParams,
  any,
  PutNotificationsSubscriptionBody
>;

type PutSubscriptionRes = ResponseLocals<
  PutNotificationsSubscriptionResponse | ErrorResponse
>;

router.put(
  "/subscription/:_id",
  auth,
  async (req: PutSubscriptionReq, res: PutSubscriptionRes) => {
    try {
      const { _id } = req.params;
      const { name } = req.body;
      const user = res.locals.user;

      const subscription = (user.subscriptions as Subscriptions).find(
        (sub: Subscription) => sub._id.toString() === _id,
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

type DeleteSubscriptionReq = Request<DeleteNotificationsSubscriptionParams>;

type DeleteSubscriptionRes = ResponseLocals<
  DeleteNotificationsSubscriptionResponse | ErrorResponse
>;

router.delete(
  "/subscription/:_id",
  auth,
  async (req: DeleteSubscriptionReq, res: DeleteSubscriptionRes) => {
    try {
      const { _id } = req.params;
      const user = res.locals.user;

      const subscriptionIndex = (user.subscriptions as Subscriptions).findIndex(
        (sub: Subscription) => sub._id.toString() === _id,
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
