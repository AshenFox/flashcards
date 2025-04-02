import { SubscriptionsCreator } from "@common/creators/entities";

export type GetNotificationsSubscriptionsResponseCreator<
  Subscriptions = SubscriptionsCreator,
> = Array<Subscriptions>;
