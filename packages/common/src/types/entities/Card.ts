import { DateJSON, DefaultOptions, ObjectIdJSON } from "@common/types";

import {
  CategoryReference,
  CategoryReferenceCreator,
  CategoryReferenceDto,
} from "./Category";

export type CardCreator<
  CategoryReference extends CategoryReferenceCreator<any>,
  Options extends DefaultOptions,
> = {
  _id: ObjectIdJSON<Options["isJson"]>;
  moduleID: ObjectIdJSON<Options["isJson"]>;
  term: string;
  definition: string;
  imgurl: string;
  creation_date: DateJSON<Options["isJson"]>;
  studyRegime: boolean;
  stage: number;
  nextRep: DateJSON<Options["isJson"]>;
  prevStage: DateJSON<Options["isJson"]>;
  lastRep: DateJSON<Options["isJson"]>;
  author_id: ObjectIdJSON<Options["isJson"]>;
  author: string;
  categories: CategoryReference[];
};

// server types
export type Card = CardCreator<CategoryReference, { isJson: false }>;
export type CardBase = Omit<Card, "_id">;

// api types
export type CardDto = CardCreator<CategoryReferenceDto, { isJson: true }>;
export type CardBaseDto = Omit<CardDto, "_id">;
