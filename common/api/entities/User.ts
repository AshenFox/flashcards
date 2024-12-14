import { JSONify, Override } from "@common/types";
import { Subscription, Subscriptions, User } from "@server/types/entities";

export type SubscriptionDto = JSONify<Subscription>;

export type SubscriptionsDto = Override<
  Subscriptions,
  {
    pc: SubscriptionDto;
    tablet: SubscriptionDto;
    mobile: SubscriptionDto;
  }
>;

export type UserDto = Override<
  JSONify<User>,
  {
    subscriptions: SubscriptionsDto;
  }
>;
