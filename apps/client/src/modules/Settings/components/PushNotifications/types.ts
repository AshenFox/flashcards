import { SubscriptionDto } from "@flashcards/common";

export type Subscription = SubscriptionDto;

export type Permission = {
  status: PermissionStatus | null;
  state: PermissionState;
};

export type CurrentSubscription = {
  data: Subscription;
  subscription: PushSubscription;
};
