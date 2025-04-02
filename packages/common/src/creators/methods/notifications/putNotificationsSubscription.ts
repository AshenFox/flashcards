import { PushSubscription } from "web-push";

import { SubscriptionCreator } from "../../entities/User";

export type PutNotificationsSubscriptionParamsCreator = {
  _id: string;
};

export type PutNotificationsSubscriptionBodyCreator = {
  name?: string;
  subscriptionData?: PushSubscription;
};

export type PutNotificationsSubscriptionResponseCreator<
  Subscription = SubscriptionCreator,
> = Subscription;
