import { cardsUISlice } from "@components/Cards";
import { createCardsFilterSlice } from "@zustand/filters";
import { createStoreHook } from "@zustand/helpers";

import { getQueryKey } from "./query";

export const useHomeCardsFiltersStore = createStoreHook({
  storeName: "HomeCardsFilters",
  instanceKey: "home-cards",
  slice: createCardsFilterSlice({ queryKey: getQueryKey }),
});

export const useHomeCardsUIStore = createStoreHook({
  storeName: "HomeCardsUI",
  instanceKey: "home-cards",
  slice: cardsUISlice,
});
