import { createSlidingWindowVirtualizerHook } from "@components/Virtualized/hooks/createSlidingWindowVirtualizerHook";
import type { ModuleDto } from "@flashcards/common";
import { useMemo } from "react";

import { getBelowDividerLabel } from "../../components/Divider/Divider";
import { getQueryKey, HomeModulesPage } from "./query";
import { useHomeModulesFiltersStore } from "./stores";

const MODULE_ROW_BASE_ESTIMATE = 160;
const DIVIDER_EXTRA_ESTIMATE = 72;

const useBaseVirtualizer = createSlidingWindowVirtualizerHook<
  ModuleDto,
  HomeModulesPage
>({
  store: {
    storeName: "HomeModulesRowHeights",
    instanceKey: "home-modules",
  },
  baseEstimate: MODULE_ROW_BASE_ESTIMATE,
  estimateItemSize: (moduleItem, index, modules) => {
    const nextDate = modules[index + 1]?.creation_date;
    let size = MODULE_ROW_BASE_ESTIMATE;
    if (getBelowDividerLabel(moduleItem.creation_date, nextDate)) {
      size += DIVIDER_EXTRA_ESTIMATE;
    }
    if (index === 0) {
      size += DIVIDER_EXTRA_ESTIMATE;
    }
    return size;
  },
});

export function useHomeModulesSlidingWindowVirtualizer({
  rawModules,
  infiniteData,
}: {
  rawModules: ModuleDto[];
  infiniteData:
    | import("@tanstack/react-query").InfiniteData<HomeModulesPage, number>
    | undefined;
}) {
  const filters = useHomeModulesFiltersStore(state => state.filters);
  const namespaceKey = useMemo(
    () => JSON.stringify(getQueryKey(filters)),
    [filters],
  );

  return useBaseVirtualizer({
    rawItems: rawModules,
    infiniteData,
    namespaceKey,
  });
}

