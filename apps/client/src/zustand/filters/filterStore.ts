import { withActionName } from "@zustand/helpers";
import { type Slice } from "../types";

import { defaultCardsFilters, DefaultFilters, defaultModulesFilters, defaultPagination, FilterStore, FilterValue } from "./types";

type CreateFiltersSliceOptions<Filters extends DefaultFilters> = {
  defaultFilters: Filters;
};

export const createFiltersSlice = <Filters extends DefaultFilters>({
  defaultFilters,
}: CreateFiltersSliceOptions<Filters>): Slice<FilterStore<Filters>> => (setAction) => {
  const set = withActionName<FilterStore<Filters>>(setAction);
  return {
    filters: defaultFilters,
    pagination: defaultPagination,
    setFilter: (filter, value) =>
      set(
        (state) => {
          (state.filters as Record<string, FilterValue>)[filter as string] = value;
        },
        "setFilter",
      ),
    setPagination: (pagination) =>
      set(
        (state) => {
          state.pagination = pagination;
        },
        "setPagination",
      ),
    resetFilters: () =>
      set(
        (state) => {
          state.filters = { ...defaultFilters } as typeof state.filters;
        },
        "resetFilters",
      ),
  };
};

export const homeModulesFilterSlice = createFiltersSlice({
  defaultFilters: defaultModulesFilters,
});

export const cardsFilterSlice = createFiltersSlice({
  defaultFilters: defaultCardsFilters,
});

