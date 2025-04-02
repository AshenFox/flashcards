import { PushSubscription } from "web-push";

import { SubscriptionCreator } from "../../entities/User";

export type PostNotificationsSubscribeBodyCreator = {
  name: string;
  subscriptionData: PushSubscription;
};

export type PostNotificationsSubscribeResponseCreator<
  Subscription = SubscriptionCreator,
> = Subscription;
