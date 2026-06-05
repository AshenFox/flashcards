import { CardDto } from "@flashcards/common";

import { card_fields } from "./initState";
import { Cards } from "./types";

export const transformCards = (cards: CardDto[]): Cards =>
  Object.fromEntries(
    cards.map(card => [
      card._id,
      {
        ...card,
        ...card_fields,
      },
    ]),
  );
