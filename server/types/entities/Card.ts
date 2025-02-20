import { CardCreator } from "@common/creators/entities";

export type CardBase = Omit<CardCreator, "_id">;
export type Card = CardCreator;
