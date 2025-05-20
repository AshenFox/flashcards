import { DateJSON, DefaultOptions, ObjectIdJSON } from "@common/types";

export type ModuleCreator<Options extends DefaultOptions> = {
  _id: ObjectIdJSON<Options["isJson"]>;
  title: string;
  author: string;
  author_id: ObjectIdJSON<Options["isJson"]>;
  numberSR?: number;
  cards: ObjectIdJSON<Options["isJson"]>[];
  creation_date: DateJSON<Options["isJson"]>;
  draft: boolean;
};

// server types
export type Module = ModuleCreator<{ isJson: false }>;

// api types
export type ModuleDto = ModuleCreator<{ isJson: true }>;
