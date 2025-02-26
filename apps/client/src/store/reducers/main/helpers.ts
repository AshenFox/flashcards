import { CardDto } from "@flashcards/common/src/api/entities";

import { card_fields, url_fields } from "./initState";
import { Cards, ImgurlBase, ImgurlObjs } from "./types";

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

export const transformImgurl = (arr: ImgurlBase[]): ImgurlObjs =>
  Object.fromEntries(
    arr.map((url, i) => [
      i,
      {
        ...url,
        ...url_fields,
      },
    ]),
  );
