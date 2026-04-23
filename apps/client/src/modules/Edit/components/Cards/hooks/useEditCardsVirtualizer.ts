import type { CardDto } from "@flashcards/common";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useCallback } from "react";

const EDIT_CARD_ROW_ESTIMATE = 240;
const OVERSCAN = 6;
const GAP_PX = 15;

export function useEditCardsVirtualizer(cards: CardDto[]) {
  const estimateSize = useCallback(() => EDIT_CARD_ROW_ESTIMATE, []);

  return useWindowVirtualizer({
    count: cards.length,
    overscan: OVERSCAN,
    gap: GAP_PX,
    estimateSize,
    getItemKey: index => cards[index]?._id ?? index,
  });
}
