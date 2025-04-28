import {
  SubscriptionCreator,
  Subscriptions,
  SubscriptionsCreator,
  SubscriptionsDto,
} from "@common/types/entities/User";
import { DefaultOptions } from "@common/types/utils";

type GetNotificationsSubscriptionsResponseCreator<
  Subscriptions extends SubscriptionsCreator<
    SubscriptionCreator<DefaultOptions>
  >,
> = Subscriptions;

// server types
export type GetNotificationsSubscriptionsResponse =
  GetNotificationsSubscriptionsResponseCreator<Subscriptions>;

// api types
export type GetNotificationsSubscriptionsResponseDto =
  GetNotificationsSubscriptionsResponseCreator<SubscriptionsDto>;
