import { DefaultOptions } from "@common/types/utils";
import { PushSubscription } from "web-push";

import {
  Subscription,
  SubscriptionCreator,
  SubscriptionDto,
} from "../../entities/User";
type PostNotificationsSubscribeQueryCreator = {
  name: string;
  subscriptionData: PushSubscription;
};

type PostNotificationsSubscribeResponseCreator<
  Subscription extends SubscriptionCreator<DefaultOptions>,
> = Subscription;

// server types
export type PostNotificationsSubscribeQuery =
  PostNotificationsSubscribeQueryCreator;
export type PostNotificationsSubscribeResponse =
  PostNotificationsSubscribeResponseCreator<Subscription>;

// api types
export type PostNotificationsSubscribeQueryDto =
  PostNotificationsSubscribeQueryCreator;
export type PostNotificationsSubscribeResponseDto =
  PostNotificationsSubscribeResponseCreator<SubscriptionDto>;
