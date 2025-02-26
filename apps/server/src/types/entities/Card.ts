import { CardCreator } from "@flashcards/common/src/creators/entities";

export type CardBase = Omit<CardCreator, "_id">;
export type Card = CardCreator;
