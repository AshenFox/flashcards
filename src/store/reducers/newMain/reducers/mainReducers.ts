import { ModuleDto } from "@common/api/entities";
import { ModulesPageableDto } from "@common/api/methods";

import {
  defaultHomeModulesData,
  defaultHomeModulesFilters,
} from "../initState";
import {
  Cards,
  EntryCollectionName,
  FilterValue,
  MainCaseReducer,
  Module,
  SelectBy,
  SelectCreated,
} from "../types";

export const setIsServer: MainCaseReducer = state => {
  state.is_server = typeof document === "undefined";
};

export const clearModule: MainCaseReducer = state => {
  state.module = false;
  state.cards = {};
};

export const setModule: MainCaseReducer<{ cards: Cards; module: Module }> = (
  state,
  action,
) => {
  state.module = action.payload.module;
  state.cards = action.payload.cards;
};

export const setModuleCards: MainCaseReducer<{ cards: Cards }> = (
  state,
  action,
) => {
  state.cards = { ...state.cards, ...action.payload.cards };
};

export const setEntryCollectionFilter: MainCaseReducer<{
  entryCollection: EntryCollectionName;
  filter: string;
  value: FilterValue;
}> = (state, action) => {
  state[action.payload.entryCollection].filters[action.payload.filter] =
    action.payload.value;
};

export const resetFieldsCards: MainCaseReducer = state => {
  state.cards = {};
  state.cards_number = false;
  state.all_cards = false;
  state.skip_cards = 0;
};

export const resetHomeModulesData: MainCaseReducer = state => {
  state.draft = null;
  state.homeModules.data = defaultHomeModulesData;
};

export const resetHomeModulesFilters: MainCaseReducer = state => {
  state.homeModules.filters = defaultHomeModulesFilters;
};

export const resetSearch: MainCaseReducer = state => {
  state.search_cards = { value: "" };
  state.select_by = { value: "term", label: "Term" };
  state.select_created = { value: "newest", label: "Newest" };
};

export const setSelectBy: MainCaseReducer<SelectBy> = (state, action) => {
  state.select_by = action.payload;
};

export const setSelectCreated: MainCaseReducer<SelectCreated> = (
  state,
  action,
) => {
  state.select_created = action.payload;
};

export const setScrollTop: MainCaseReducer<{ value: boolean }> = (
  state,
  action,
) => {
  state.scroll_top = action.payload.value;
};

export const controlSearchCards: MainCaseReducer<{ value: string }> = (
  state,
  action,
) => {
  state.search_cards = { value: action.payload.value };
};

export const setMainLoading: MainCaseReducer<boolean> = (state, action) => {
  state.loading = action.payload;
};

export const setSkipCards: MainCaseReducer<number> = (state, action) => {
  state.skip_cards = action.payload;
};

export const setHomeModulesLoading: MainCaseReducer<boolean> = (
  state,
  action,
) => {
  state.homeModules.loading = action.payload;
};

export const setHomeModules: MainCaseReducer<{
  draft: ModuleDto;
  modules: ModulesPageableDto;
}> = (state, action) => {
  const { draft, modules } = action.payload;

  state.draft = draft;
  state.homeModules.data = {
    ...modules,
    page: modules.page + 1,
    entries: [...(state.homeModules.data.entries || []), ...modules.entries],
  };
};

export const setCards: MainCaseReducer<{ cards: Cards }> = (state, action) => {
  state.cards = { ...state.cards, ...action.payload.cards };
};
