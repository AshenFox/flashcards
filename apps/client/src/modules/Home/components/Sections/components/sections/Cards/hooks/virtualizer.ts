import { createSlidingWindowVirtualizerHook } from "@components/Virtualized/hooks/createSlidingWindowVirtualizerHook";
import { useMemo } from "react";

import { HomeCardsVirtualItem } from "./items";
import { getQueryKey } from "./query";
import { useHomeCardsFiltersStore, useHomeCardsUIStore } from "./stores";

const CARD_ROW_BASE_ESTIMATE = 240;
const DIVIDER_ESTIMATE = 72;
const EDIT_MODE_EXTRA_ESTIMATE = 100;

const useBaseVirtualizer =
  createSlidingWindowVirtualizerHook<HomeCardsVirtualItem>({
    store: {
      storeName: "HomeCardsRowHeights",
      instanceKey: "home-cards",
    },
    baseEstimate: CARD_ROW_BASE_ESTIMATE,
    estimateItemSize: item => {
      if (item.type === "top-divider" || item.type === "below-divider") {
        return DIVIDER_ESTIMATE;
      }

      let size = CARD_ROW_BASE_ESTIMATE;
      if (useHomeCardsUIStore.getState().get(item.card._id).edit) {
        size += EDIT_MODE_EXTRA_ESTIMATE;
      }
      return size;
    },
  });

export function useHomeCardsSlidingWindowVirtualizer({
  items,
}: {
  items: HomeCardsVirtualItem[];
}) {
  const filters = useHomeCardsFiltersStore(state => state.filters);
  const namespaceKey = useMemo(
    () => JSON.stringify(getQueryKey(filters)),
    [filters],
  );

  return useBaseVirtualizer({ rawItems: items, namespaceKey });
}
