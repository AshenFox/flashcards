import { CardDto } from "@flashcards/common";

export type GameCardFields = {
  edit: boolean;
  question: boolean;
};

export type GameCard = CardDto & GameCardFields;
