import { DateJSON } from "@common/types";

export type NotificationCreator<
  Options extends { isJson: boolean } = { isJson: false },
> = {
  _id: string;
  time: DateJSON<Options["isJson"]>;
  number: number;
  user_id: string;
};
