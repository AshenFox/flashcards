import {
  SubscriptionCreator,
  SubscriptionsCreator,
  UserCreator,
} from "@flashcards/common/src/creators/entities";

export type Subscription = SubscriptionCreator;
export type Subscriptions = SubscriptionsCreator<Subscription>;
export type User = UserCreator<Subscriptions>;
