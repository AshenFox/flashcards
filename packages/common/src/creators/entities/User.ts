import { DateJSON } from "@common/types";
import { Types } from "mongoose";
import { PushSubscription } from "web-push";

export type SubscriptionCreator<
  Options extends { isJson: boolean } = { isJson: false },
> = {
  _id: Types.ObjectId;
  name: string;
  subscriptionDate: DateJSON<Options["isJson"]>;
  subscriptionData: PushSubscription;
};

export type SubscriptionsCreator<Subscription = SubscriptionCreator> =
  Subscription[];

export type UserCreator<
  Subscriptions = SubscriptionsCreator,
  Options extends { isJson: boolean } = { isJson: false },
> = {
  _id: string;
  username: string;
  email: string;
  password: string;
  registration_date: DateJSON<Options["isJson"]>;
  subscriptions: Subscriptions;
};
