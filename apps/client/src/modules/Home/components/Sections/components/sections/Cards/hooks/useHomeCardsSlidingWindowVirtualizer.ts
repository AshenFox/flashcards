import { createSlidingWindowVirtualizerHook } from "@components/Virtualized/hooks/createSlidingWindowVirtualizerHook";
import type { CardDto, GetMainCardsResponseDto } from "@flashcards/common";
import { useMemo } from "react";

import { rowShowsDateDivider } from "../../components/Divider/Divider";
import { getQueryKey } from "./query";
import { useHomeCardsFiltersStore, useHomeCardsUIStore } from "./stores";

const CARD_ROW_BASE_ESTIMATE = 240;
const DIVIDER_EXTRA_ESTIMATE = 72;
const EDIT_MODE_EXTRA_ESTIMATE = 100;

const useBaseVirtualizer = createSlidingWindowVirtualizerHook<
  CardDto,
  GetMainCardsResponseDto
>({
  store: {
    storeName: "HomeCardsRowHeights",
    instanceKey: "home-cards",
  },
  baseEstimate: CARD_ROW_BASE_ESTIMATE,
  estimateItemSize: (card, index, cards) => {
    const prevDate = cards[index - 1]?.creation_date;
    let size = CARD_ROW_BASE_ESTIMATE;
    if (rowShowsDateDivider(prevDate, card.creation_date)) {
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
  infiniteData,
}: {
  rawCards: CardDto[];
  infiniteData:
    | import("@tanstack/react-query").InfiniteData<
        GetMainCardsResponseDto,
        number
      >
    | undefined;
}) {
  const filters = useHomeCardsFiltersStore(state => state.filters);
  const namespaceKey = useMemo(
    () => JSON.stringify(getQueryKey(filters)),
    [filters],
  );

  return useBaseVirtualizer({ rawItems: rawCards, infiniteData, namespaceKey });
}
