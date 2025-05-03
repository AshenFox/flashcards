import { DefaultOptions } from "@common/types/utils";
import { PushSubscription } from "web-push";

import {
  Subscription,
  SubscriptionCreator,
  SubscriptionDto,
} from "../../entities/User";

type QueryCreator = {
  name: string;
  subscriptionData: PushSubscription;
};

type ResponseCreator<Subscription extends SubscriptionCreator<DefaultOptions>> =
  Subscription;

// server types
export type PostNotificationsSubscribeQuery = QueryCreator;
export type PostNotificationsSubscribeResponse = ResponseCreator<Subscription>;

// api types
export type PostNotificationsSubscribeQueryDto = QueryCreator;
export type PostNotificationsSubscribeResponseDto =
  ResponseCreator<SubscriptionDto>;
