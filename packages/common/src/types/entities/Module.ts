import { DateJSON, DefaultOptions } from "@common/types";
import { Types } from "mongoose";

export type ModuleCreator<Options extends DefaultOptions> = {
  _id: string;
  title: string;
  author: string;
  author_id: string;
  cards: Types.ObjectId[];
  creation_date: DateJSON<Options["isJson"]>;
  draft: boolean;
};

// server types
export type Module = ModuleCreator<{ isJson: false }>;

// api types
export type ModuleDto = ModuleCreator<{ isJson: true }>;
