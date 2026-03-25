import { withActionName } from "@zustand/helpers";

import { type Slice } from "../types";
import { CardsFilters, defaultCardsFilters, DefaultFilters, defaultModuleCardsFilters, defaultModulesFilters, defaultPagination, FilterStore, FilterValue, ModuleCardsFilters, ModulesFilters, QueryKey } from "./types";

type CreateFiltersSliceOptions<Filters extends DefaultFilters> = {
  queryKey: QueryKey<Filters>;
  defaultFilters: Filters;
};

export const createFiltersSlice = <Filters extends DefaultFilters>({
  defaultFilters,
  queryKey,
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
    queryKey
  };
};

export const createModulesFilterSlice = ({ queryKey }: { queryKey: QueryKey<ModulesFilters> }) => createFiltersSlice({
  defaultFilters: defaultModulesFilters,
  queryKey,
});

export const createCardsFilterSlice = ({ queryKey }: { queryKey: QueryKey<CardsFilters> }) => createFiltersSlice({
  defaultFilters: defaultCardsFilters,
  queryKey,
});

export const createModuleCardsFilterSlice = ({ queryKey }: { queryKey: QueryKey<ModuleCardsFilters> }) => createFiltersSlice({
  defaultFilters: defaultModuleCardsFilters,
  queryKey,
});

