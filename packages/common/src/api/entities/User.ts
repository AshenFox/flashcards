import {
  SubscriptionCreator,
  SubscriptionsCreator,
  UserCreator,
} from "@common/creators/entities";

export type SubscriptionDto = SubscriptionCreator<{ isJson: true }>;
export type SubscriptionsDto = SubscriptionsCreator<SubscriptionDto>;
export type UserDto = UserCreator<SubscriptionsDto>;
