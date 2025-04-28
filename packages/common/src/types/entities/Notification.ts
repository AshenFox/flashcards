import { DateJSON, DefaultOptions } from "@common/types";

export type NotificationCreator<Options extends DefaultOptions> = {
  _id: string;
  time: DateJSON<Options["isJson"]>;
  number: number;
  user_id: string;
};

// server types
export type Notification = NotificationCreator<{ isJson: false }>;

// api types
export type NotificationDto = NotificationCreator<{ isJson: true }>;
