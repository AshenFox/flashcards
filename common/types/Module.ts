import { SwapDatesWithStrings } from "./utils";

export type Module = {
  _id: string;
  title: string;
  author: string;
  author_id: string;
  cards: string[];
  number: number;
  numberSR: number;
  creation_date: Date;
  draft: boolean;
};

export type ModuleDto = SwapDatesWithStrings<Module>;
