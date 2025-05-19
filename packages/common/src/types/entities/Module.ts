import { DateJSON, DefaultOptions, ObjectIdJSON } from "@common/types";

export type ModuleCreator<Options extends DefaultOptions> = {
  _id: string;
  title: string;
  author: string;
  author_id: string;
  numberSR?: number;
  cards: ObjectIdJSON<Options["isJson"]>[];
  creation_date: DateJSON<Options["isJson"]>;
  draft: boolean;
};

// server types
export type Module = ModuleCreator<{ isJson: false }>;

// api types
export type ModuleDto = ModuleCreator<{ isJson: true }>;
