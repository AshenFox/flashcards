import { type Slice } from "../types";

import { defaultCardsFilters, DefaultFilters, defaultModulesFilters, defaultPagination, FilterStore, FilterValue } from "./types";

type CreateFiltersSliceOptions<Filters extends DefaultFilters> = {
  defaultFilters: Filters;
};

export const createFiltersSlice = <Filters extends DefaultFilters>({
  defaultFilters,
}: CreateFiltersSliceOptions<Filters>): Slice<FilterStore<Filters>> => (set) => ({
  filters: defaultFilters,
  pagination: defaultPagination,
  setFilter: (filter, value) =>
    set((state) => {
      (state.filters as Record<string, FilterValue>)[filter as string] = value;
    }, false, "setFilter"),
  setPagination: (pagination) =>
    set((state) => {
      state.pagination = pagination;
    }, false, "setPagination"),
  resetFilters: () =>
    set((state) => {
      state.filters = { ...defaultFilters } as typeof state.filters;
    }, false, "resetFilters"),
});

export const homeModulesFilterSlice = createFiltersSlice({
  defaultFilters: defaultModulesFilters,
});

export const cardsFilterSlice = createFiltersSlice({
  defaultFilters: defaultCardsFilters,
});

