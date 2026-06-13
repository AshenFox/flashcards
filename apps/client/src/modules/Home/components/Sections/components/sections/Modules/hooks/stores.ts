import { createModulesFilterSlice } from "@components/Filters/store";
import { createStoreHook } from "@store/helpers";

import { getQueryKey } from "./query";

export const useHomeModulesFiltersStore = createStoreHook({
  storeName: "HomeModulesFilters",
  instanceKey: "home-modules",
  slice: createModulesFilterSlice({ queryKey: getQueryKey }),
});

