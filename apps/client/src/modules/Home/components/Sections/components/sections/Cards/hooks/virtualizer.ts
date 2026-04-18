import { createSlidingWindowVirtualizerHook } from "@components/Virtualized/hooks/createSlidingWindowVirtualizerHook";
import type { CardDto } from "@flashcards/common";
import { useMemo } from "react";

import { getBelowDividerLabel } from "../../components/Divider/Divider";
import { getQueryKey } from "./query";
import { useHomeCardsFiltersStore, useHomeCardsUIStore } from "./stores";

const CARD_ROW_BASE_ESTIMATE = 240;
const DIVIDER_EXTRA_ESTIMATE = 72;
const EDIT_MODE_EXTRA_ESTIMATE = 100;

const useBaseVirtualizer = createSlidingWindowVirtualizerHook<CardDto>({
  store: {
    storeName: "HomeCardsRowHeights",
    instanceKey: "home-cards",
  },
  baseEstimate: CARD_ROW_BASE_ESTIMATE,
  estimateItemSize: (card, index, cards) => {
    const nextDate = cards[index + 1]?.creation_date;
    let size = CARD_ROW_BASE_ESTIMATE;
    if (getBelowDividerLabel(card.creation_date, nextDate)) {
      size += DIVIDER_EXTRA_ESTIMATE;
    }
    if (index === 0) {
      size += DIVIDER_EXTRA_ESTIMATE;
    }
    if (useHomeCardsUIStore.getState().get(card._id).edit) {
      size += EDIT_MODE_EXTRA_ESTIMATE;
    }

    return size;
  },
});

export function useHomeCardsSlidingWindowVirtualizer({
  rawCards,
}: {
  rawCards: CardDto[];
}) {
  const filters = useHomeCardsFiltersStore(state => state.filters);
  const namespaceKey = useMemo(
    () => JSON.stringify(getQueryKey(filters)),
    [filters],
  );

  return useBaseVirtualizer({ rawItems: rawCards, namespaceKey });
}
