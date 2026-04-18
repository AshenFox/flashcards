import type { CardDto } from "@flashcards/common";

import {
  getBelowDividerLabel,
  getTopDividerLabel,
} from "../../components/Divider/Divider";

export type HomeCardsVirtualItem =
  | { type: "card"; _id: string; card: CardDto }
  | { type: "top-divider"; _id: "top"; label: string }
  | { type: "below-divider"; _id: string; label: string };

export const TOP_DIVIDER_ID = "top";
export const belowDividerId = (cardId: string) => `below:${cardId}`;

export function buildHomeCardsItems(
  rawCards: CardDto[],
  hasPreviousPage: boolean,
): HomeCardsVirtualItem[] {
  const out: HomeCardsVirtualItem[] = [];

  if (!hasPreviousPage && rawCards.length > 0) {
    const label = getTopDividerLabel(rawCards[0].creation_date);
    if (label) {
      out.push({ type: "top-divider", _id: TOP_DIVIDER_ID, label });
    }
  }

  for (let i = 0; i < rawCards.length; i++) {
    const card = rawCards[i];
    out.push({ type: "card", _id: card._id, card });

    const nextDate = rawCards[i + 1]?.creation_date;
    const label = getBelowDividerLabel(card.creation_date, nextDate);
    if (label) {
      out.push({
        type: "below-divider",
        _id: belowDividerId(card._id),
        label,
      });
    }
  }

  return out;
}
