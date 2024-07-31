import { SwapDatesWithStrings } from "./utils";

export type Notification = {
  _id: string;
  time: Date;
  number: number;
  user_id: string;
};

export type NotificationDto = SwapDatesWithStrings<Notification>;
