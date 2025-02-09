import {
  CardFields,
  HomeCardsFilters,
  HomeCardsSection,
  HomeModuleFilters,
  HomeModulesSection,
  ImgurlFields,
  MainState,
  ModuleFields,
  Pagination,
} from "./types";

export const card_fields: CardFields = {
  edit: false,
  gallery: {
    search: false,
    query: "",
    imgurl_obj: {},
    loading: false,
    loaded: 0,
    failed: 0,
    all: 0,
    position: 0,
    width: 0,
    error: false,
  },
  scrape: {
    loading: false,
  },
  save: true,
  question: false,
};

export const module_fields: ModuleFields = {
  question: false,
  module_loading: false,
};

export const url_fields: ImgurlFields = {
  ok: false,
};

export const defaultPagination: Pagination = {
  all: null,
  number: null,
  page: 0,
  end: false,
};

export const defaultHomeModulesFilters: HomeModuleFilters = {
  search: "",
  created: "newest",
  draft: true,
};

export const defaultHomeModulesSection: HomeModulesSection = {
  loading: false,
  filters: defaultHomeModulesFilters,
  pagination: defaultPagination,
};

export const defaultHomeCardsFilters: HomeCardsFilters = {
  search: "",
  created: "newest",
  by: "term",
};

export const defaultHomeCardsSection: HomeCardsSection = {
  loading: false,
  filters: defaultHomeCardsFilters,
  pagination: defaultPagination,
};

const initState: MainState = {
  is_server: true,
  loading: false,

  module: null,
  modules: [],

  cards: {},

  draft: false,

  sections: {
    homeModules: defaultHomeModulesSection,
    homeCards: defaultHomeCardsSection,
  },

  search_cards: {
    value: "",
  },
  select_by: { value: "term", label: "Term" },
  select_created: { value: "newest", label: "Newest" },

  scroll_top: false,
};

export default initState;
