import { PushSubscription } from "web-push";

export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  registration_date: Date;
  subscriptions: {
    pc: PushSubscription;
    tablet: PushSubscription;
    mobile: PushSubscription;
  };
};
