import { GetNotificationsSubscriptionsResponseCreator } from "@flashcards/common";
import { Subscription } from "@serverTypes/entities";

export type GetNotificationsSubscriptionsResponse =
  GetNotificationsSubscriptionsResponseCreator<Subscription>;
