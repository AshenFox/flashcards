import { DateJSON, DefaultOptions, ObjectIdJSON } from "@common/types";

export type CardCreator<Options extends DefaultOptions> = {
  _id: string;
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
  author_id: string;
  author: string;
};

// server types
export type Card = CardCreator<{ isJson: false }>;
export type CardBase = Omit<Card, "_id">;

// api types
export type CardDto = CardCreator<{ isJson: true }>;
export type CardBaseDto = Omit<CardDto, "_id">;
