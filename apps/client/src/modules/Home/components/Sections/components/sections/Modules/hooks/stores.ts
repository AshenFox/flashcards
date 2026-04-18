import { createModulesFilterSlice } from "@zustand/filters";
import { createStoreHook } from "@zustand/helpers";

import { getQueryKey } from "./query";

export const useHomeModulesFiltersStore = createStoreHook({
  storeName: "HomeModulesFilters",
  instanceKey: "home-modules",
  slice: createModulesFilterSlice({ queryKey: getQueryKey }),
});

