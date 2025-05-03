import { DefaultOptions } from "@common/types/utils";
import { PushSubscription } from "web-push";

import {
  Subscription,
  SubscriptionCreator,
  SubscriptionDto,
} from "../../entities/User";
type ParamsCreator = {
  _id: string;
};

type BodyCreator = {
  name?: string;
  subscriptionData?: PushSubscription;
};

type ResponseCreator<Subscription extends SubscriptionCreator<DefaultOptions>> =
  Subscription;

// server types
export type PutNotificationsSubscriptionParams = ParamsCreator;
export type PutNotificationsSubscriptionBody = BodyCreator;
export type PutNotificationsSubscriptionResponse =
  ResponseCreator<Subscription>;

// api types
export type PutNotificationsSubscriptionParamsDto = ParamsCreator;
export type PutNotificationsSubscriptionBodyDto = BodyCreator;
export type PutNotificationsSubscriptionResponseDto =
  ResponseCreator<SubscriptionDto>;
