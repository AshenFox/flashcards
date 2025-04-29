import { DateJSON, DefaultOptions } from "@common/types";
import { Types } from "mongoose";
import { PushSubscription } from "web-push";

export type SubscriptionCreator<Options extends DefaultOptions> = {
  _id: Types.ObjectId;
  name: string;
  subscriptionDate: DateJSON<Options["isJson"]>;
  subscriptionData: PushSubscription;
};

export type SubscriptionsCreator<
  Subscription extends SubscriptionCreator<DefaultOptions>,
> = Subscription[];

export type UserCreator<
  Subscriptions extends SubscriptionsCreator<any>,
  Options extends DefaultOptions = DefaultOptions,
> = {
  _id: string;
  username: string;
  email: string;
  password: string;
  registration_date: DateJSON<Options["isJson"]>;
  subscriptions: Subscriptions;
};

// server types
export type Subscription = SubscriptionCreator<{ isJson: false }>;
export type Subscriptions = SubscriptionsCreator<Subscription>;
export type User = UserCreator<Subscriptions, { isJson: false }>;

// api types
export type SubscriptionDto = SubscriptionCreator<{ isJson: true }>;
export type SubscriptionsDto = SubscriptionsCreator<SubscriptionDto>;
export type UserDto = UserCreator<SubscriptionsDto, { isJson: true }>;
