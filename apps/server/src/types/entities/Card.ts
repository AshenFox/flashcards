import { CardCreator } from "@flashcards/common";

export type CardBase = Omit<CardCreator, "_id">;
export type Card = CardCreator;
