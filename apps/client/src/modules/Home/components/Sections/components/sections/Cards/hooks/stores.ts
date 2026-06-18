import { cardsUISlice } from "@components/Cards";
import { createCardsFilterSlice } from "@components/Filters/store";
import { createStoreHook } from "@store/helpers";

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
