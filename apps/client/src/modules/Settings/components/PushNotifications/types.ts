export type Subscription = {
  _id: string;
  name: string;
  subscriptionDate: Date;
  subscriptionData: {
    endpoint: string;
    keys: {
      p256dh: string;
      auth: string;
    };
  };
};

export type Permission = {
  status: PermissionStatus;
  state: PermissionState;
};

export type CurrentSubscription = {
  data: Subscription;
  subscription: PushSubscription;
};
