import { cardsUISlice } from "@components/Cards";
import { createCardsFilterSlice } from "@zustand/filters";
import { createStoreHook } from "@zustand/helpers";
import { rowHeightsSlice, type RowHeightsStore } from "@zustand/rowHeights";

import { getQueryKey } from "./query";

export type HomeCardsRowHeightsStore = RowHeightsStore;

export const useHomeCardsRowHeightsStore = createStoreHook({
    storeName: "HomeCardsRowHeights",
    instanceKey: "home-cards",
    slice: rowHeightsSlice,
});

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


