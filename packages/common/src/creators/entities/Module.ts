import { DateJSON } from "@common/types";

export type ModuleCreator<
  Options extends { isJson: boolean } = { isJson: false },
> = {
  _id: string;
  title: string;
  author: string;
  author_id: string;
  cards: string[];
  number: number;
  numberSR: number;
  creation_date: DateJSON<Options["isJson"]>;
  draft: boolean;
};
