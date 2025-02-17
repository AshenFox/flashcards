import { CardDto } from "@common/api/entities";
import {
  GetMainCardsResponseDto,
  GetMainModuleCardsResponseDto,
  GetMainModuleResponseDto,
  GetMainModulesResponseDto,
} from "@common/api/methods";

import {
  card_fields,
  defaultHomeCardsFilters,
  defaultHomeModulesFilters,
  defaultModuleFilters,
  defaultPagination,
  module_fields,
} from "../initState";
import { Cards, FilterValue, MainCaseReducer, SectionName } from "../types";

export const setIsServer: MainCaseReducer = state => {
  state.is_server = typeof document === "undefined";
};

export const resetModuleData: MainCaseReducer = (state, action) => {
  state.module = null;
  state.cards = {};
};

export const resetModuleCardsData: MainCaseReducer = state => {
  state.cards = {};
};

export const setModule: MainCaseReducer<GetMainModuleResponseDto> = (
  state,
  action,
) => {
  const { module, cards } = action.payload;

  state.module = { ...module, ...module_fields };
  state.cards = arr_to_obj(cards.entries);

  state.sections.module.pagination = cards.pagination;
};

export const setModuleCards: MainCaseReducer<GetMainModuleCardsResponseDto> = (
  state,
  action,
) => {
  state.cards = { ...state.cards, ...arr_to_obj(action.payload.entries) };
};

export const setSectionFilter: MainCaseReducer<{
  section: SectionName;
  filter: string;
  value: FilterValue;
}> = (state, action) => {
  state.sections[action.payload.section].filters[action.payload.filter] =
    action.payload.value;
};

export const resetHomeModulesData: MainCaseReducer = state => {
  state.module = null;
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
  module: defaultModuleFilters,
};

export const resetSectionFilters: MainCaseReducer<SectionName> = (
  state,
  action,
) => {
  state.sections[action.payload].filters = defaultFilters[action.payload];
};

export const setScrollTop: MainCaseReducer<{ value: boolean }> = (
  state,
  action,
) => {
  state.scroll_top = action.payload.value;
};

export const setSectionLoading: MainCaseReducer<{
  value: boolean;
  section: SectionName;
}> = (state, action) => {
  const { value, section } = action.payload;

  state.sections[section].loading = value;
};

export const setHomeModules: MainCaseReducer<GetMainModulesResponseDto> = (
  state,
  action,
) => {
  const { draft, modules } = action.payload;

  state.module = { ...draft, ...module_fields };
  state.modules = [...(state.modules || []), ...modules.entries];

  state.sections.homeModules.pagination = {
    ...modules.pagination,
    page: modules.pagination.page + 1,
  };
};

export const setCards: MainCaseReducer<GetMainCardsResponseDto> = (
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
