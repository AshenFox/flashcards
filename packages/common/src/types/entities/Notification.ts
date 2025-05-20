import { DateJSON, DefaultOptions, ObjectIdJSON } from "@common/types";

export type NotificationCreator<Options extends DefaultOptions> = {
  _id: ObjectIdJSON<Options["isJson"]>;
  time: DateJSON<Options["isJson"]>;
  number: number;
  user_id: ObjectIdJSON<Options["isJson"]>;
};

// server types
export type Notification = NotificationCreator<{ isJson: false }>;

// api types
export type NotificationDto = NotificationCreator<{ isJson: true }>;
