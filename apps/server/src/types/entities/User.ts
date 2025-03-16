import {
  SubscriptionCreator,
  SubscriptionsCreator,
  UserCreator,
} from "@flashcards/common";

export type Subscription = SubscriptionCreator;
export type Subscriptions = SubscriptionsCreator<Subscription>;
export type User = UserCreator<Subscriptions>;
