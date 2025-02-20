import { DateJSON } from "@common/types";

export type CardCreator<
  Options extends { isJson: boolean } = { isJson: false },
> = {
  _id: string;
  moduleID: string;
  term: string;
  definition: string;
  imgurl: string;
  creation_date: DateJSON<Options["isJson"]>;
  studyRegime: boolean;
  stage: number;
  order: number;
  nextRep: DateJSON<Options["isJson"]>;
  prevStage: DateJSON<Options["isJson"]>;
  lastRep: DateJSON<Options["isJson"]>;
  author_id: string;
  author: string;
};
