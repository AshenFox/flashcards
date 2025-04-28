import { DefaultOptions } from "@common/types/utils";
import { PushSubscription } from "web-push";

import {
  Subscription,
  SubscriptionCreator,
  SubscriptionDto,
} from "../../entities/User";
type PutNotificationsSubscriptionParamsCreator = {
  _id: string;
};

type PutNotificationsSubscriptionBodyCreator = {
  name?: string;
  subscriptionData?: PushSubscription;
};

type PutNotificationsSubscriptionResponseCreator<
  Subscription extends SubscriptionCreator<DefaultOptions>,
> = Subscription;

// server types
export type PutNotificationsSubscriptionParams =
  PutNotificationsSubscriptionParamsCreator;
export type PutNotificationsSubscriptionBody =
  PutNotificationsSubscriptionBodyCreator;
export type PutNotificationsSubscriptionResponse =
  PutNotificationsSubscriptionResponseCreator<Subscription>;

// api types
export type PutNotificationsSubscriptionParamsDto =
  PutNotificationsSubscriptionParamsCreator;
export type PutNotificationsSubscriptionBodyDto =
  PutNotificationsSubscriptionBodyCreator;
export type PutNotificationsSubscriptionResponseDto =
  PutNotificationsSubscriptionResponseCreator<SubscriptionDto>;
