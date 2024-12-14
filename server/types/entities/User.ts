import { PushSubscription } from "web-push";

export type Subscription = PushSubscription;

export type Subscriptions = {
  pc: PushSubscription;
  tablet: PushSubscription;
  mobile: PushSubscription;
};

export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  registration_date: Date;
  subscriptions: Subscriptions;
};
