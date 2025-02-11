import { CardDto } from "@common/api/entities";
import {
  CardsGetResponseDto,
  ModulesGetResponseDto,
} from "@common/api/methods";

import {
  card_fields,
  defaultHomeCardsFilters,
  defaultHomeModulesFilters,
  defaultPagination,
} from "../initState";
import {
  Cards,
  FilterValue,
  MainCaseReducer,
  Module,
  SectionName,
  SelectBy,
  SelectCreated,
} from "../types";

export const setIsServer: MainCaseReducer = state => {
  state.is_server = typeof document === "undefined";
};

export const clearModule: MainCaseReducer = state => {
  state.module = null;
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

export const setSectionFilter: MainCaseReducer<{
  section: SectionName;
  filter: string;
  value: FilterValue;
}> = (state, action) => {
  state.sections[action.payload.section].filters[action.payload.filter] =
    action.payload.value;
};

/* export const resetFieldsCards: MainCaseReducer = state => {
  state.cards = {};
  state.cards_number = false;
  state.all_cards = false;
  state.skip_cards = 0;
}; */

export const resetHomeModulesData: MainCaseReducer = state => {
  state.draft = null;
  state.modules = [];
  state.sections.homeModules.pagination = defaultPagination;
};

export const resetHomeCardsData: MainCaseReducer = state => {
  state.cards = {};
  state.sections.homeCards.pagination = defaultPagination;
};

const defaultFilters = {
  homeModules: defaultHomeModulesFilters,
  homeCards: defaultHomeCardsFilters,
};

export const resetSectionFilters: MainCaseReducer<SectionName> = (
  state,
  action,
) => {
  state.sections[action.payload].filters = defaultFilters[action.payload];
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

export const setSectionLoading: MainCaseReducer<{
  value: boolean;
  section: SectionName;
}> = (state, action) => {
  const { value, section } = action.payload;

  state.sections[section].loading = value;
};

export const setHomeModules: MainCaseReducer<ModulesGetResponseDto> = (
  state,
  action,
) => {
  const { draft, modules } = action.payload;

  state.draft = draft;
  state.modules = [...(state.modules || []), ...modules.entries];

  state.sections.homeModules.pagination = {
    ...modules.pagination,
    page: modules.pagination.page + 1,
  };
};

export const setCards: MainCaseReducer<CardsGetResponseDto> = (
  state,
  action,
) => {
  const { entries, pagination } = action.payload;

  state.cards = { ...state.cards, ...arr_to_obj(entries) };

  state.sections.homeCards.pagination = {
    ...pagination,
    page: pagination.page + 1,
  };
};

const arr_to_obj = (arr: CardDto[]): Cards => {
  return Object.fromEntries(
    arr.map(card => [
      card._id,
      {
        ...card,
        ...card_fields,
      },
    ]),
  );
};
