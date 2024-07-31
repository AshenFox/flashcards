import { SwapDatesWithStrings } from "./utils";

export type CardBase = {
  moduleID: string;
  term: string;
  definition: string;
  imgurl: string;
  creation_date: Date;
  studyRegime: boolean;
  stage: number;
  nextRep: Date;
  prevStage: Date;
  lastRep: Date;
  author_id: string;
  author: string;
};

export type Card = CardBase & {
  _id: string;
};

export type CardDto = SwapDatesWithStrings<Card>;
