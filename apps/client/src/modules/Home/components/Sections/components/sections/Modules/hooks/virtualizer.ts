import { createSlidingWindowVirtualizerHook } from "@components/Virtualized/hooks/createSlidingWindowVirtualizerHook";
import { useMemo } from "react";

import { HomeModulesVirtualItem } from "./items";
import { getQueryKey } from "./query";
import { useHomeModulesFiltersStore } from "./stores";

const MODULE_ROW_BASE_ESTIMATE = 160;
const DIVIDER_EXTRA_ESTIMATE = 72;

const useBaseVirtualizer =
  createSlidingWindowVirtualizerHook<HomeModulesVirtualItem>({
    store: {
      storeName: "HomeModulesRowHeights",
      instanceKey: "home-modules",
    },
    baseEstimate: MODULE_ROW_BASE_ESTIMATE,
    estimateItemSize: item => {
      if (item.type === "top-divider" || item.type === "below-divider") {
        return DIVIDER_EXTRA_ESTIMATE;
      }
      return MODULE_ROW_BASE_ESTIMATE;
    },
  });

export function useHomeModulesSlidingWindowVirtualizer({
  items,
}: {
  items: HomeModulesVirtualItem[];
}) {
  const filters = useHomeModulesFiltersStore(state => state.filters);
  const namespaceKey = useMemo(
    () => JSON.stringify(getQueryKey(filters)),
    [filters],
  );

  return useBaseVirtualizer({ rawItems: items, namespaceKey });
}
