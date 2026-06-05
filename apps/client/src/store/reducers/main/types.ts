import { CardDto } from "@flashcards/common";
import { CaseReducer } from "@reduxjs/toolkit";
import { Action } from "@store/types";

export type SectionName = "srCards" | "moduleCards";

export type LoadingSection = {
  loading: boolean;
};

export type MainState = {
  is_server: boolean;

  cards: Cards;

  sections: {
    srCards: LoadingSection;
    moduleCards: LoadingSection;
  };
};

export type CardFields = {
  edit: boolean;
  question: boolean;
};

export type Card = CardDto & CardFields;

export type Cards = {
  [key: string]: Card;
};

export type MainCaseReducer<P = undefined> = CaseReducer<MainState, Action<P>>;
