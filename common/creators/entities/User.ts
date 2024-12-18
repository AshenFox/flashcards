import { DateJSON } from "@common/types";
import { PushSubscription } from "web-push";

export type SubscriptionCreator = PushSubscription;

export type SubscriptionsCreator<Subscription = SubscriptionCreator> = {
  pc: Subscription;
  tablet: Subscription;
  mobile: Subscription;
};

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

export type SubscriptionDto = SubscriptionCreator;
export type SubscriptionsDto = SubscriptionsCreator<SubscriptionDto>;
export type UserDto = UserCreator<SubscriptionsDto, { isJson: true }>;
