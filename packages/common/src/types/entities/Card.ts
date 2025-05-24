import { DateJSON, DefaultOptions, ObjectIdJSON } from "@common/types";

import { TagReference, TagReferenceCreator, TagReferenceDto } from "./Tag";

export type CardCreator<
  TagReference extends TagReferenceCreator<any>,
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
  tags: TagReference[];
};

// server types
export type Card = CardCreator<TagReference, { isJson: false }>;
export type CardBase = Omit<Card, "_id">;

// api types
export type CardDto = CardCreator<TagReferenceDto, { isJson: true }>;
export type CardBaseDto = Omit<CardDto, "_id">;
