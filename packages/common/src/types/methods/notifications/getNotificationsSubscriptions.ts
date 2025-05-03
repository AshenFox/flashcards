import {
  SubscriptionCreator,
  Subscriptions,
  SubscriptionsCreator,
  SubscriptionsDto,
} from "@common/types/entities/User";
import { DefaultOptions } from "@common/types/utils";

type ResponseCreator<
  Subscriptions extends SubscriptionsCreator<
    SubscriptionCreator<DefaultOptions>
  >,
> = Subscriptions;

// server types
export type GetNotificationsSubscriptionsResponse =
  ResponseCreator<Subscriptions>;

// api types
export type GetNotificationsSubscriptionsResponseDto =
  ResponseCreator<SubscriptionsDto>;
