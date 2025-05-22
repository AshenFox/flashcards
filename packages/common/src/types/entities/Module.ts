import { DateJSON, DefaultOptions, ObjectIdJSON } from "@common/types";

import {
  CategoryReference,
  CategoryReferenceCreator,
  CategoryReferenceDto,
} from "./Category";

export type ModuleCreator<
  CategoryReference extends CategoryReferenceCreator<any>,
  Options extends DefaultOptions,
> = {
  _id: ObjectIdJSON<Options["isJson"]>;
  title: string;
  author: string;
  author_id: ObjectIdJSON<Options["isJson"]>;
  numberSR: number;
  cards: ObjectIdJSON<Options["isJson"]>[];
  creation_date: DateJSON<Options["isJson"]>;
  draft: boolean;
  categories: CategoryReference[];
};

// server types
export type Module = ModuleCreator<CategoryReference, { isJson: false }>;

// api types
export type ModuleDto = ModuleCreator<CategoryReferenceDto, { isJson: true }>;
