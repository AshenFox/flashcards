import { PushSubscription } from "web-push";

import { SwapDatesWithStrings } from "./utils";

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

export type UserDto = SwapDatesWithStrings<User>;
