import { CardsPageableDto, ModulesPageableDto } from "@common/api/methods";

import {
  CardFields,
  HomeCardsCollection,
  HomeCardsFilters,
  HomeModuleFilters,
  HomeModulesCollection,
  ImgurlFields,
  MainState,
  ModuleFields,
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

export const defaultHomeModulesFilters: HomeModuleFilters = {
  search: "",
  created: "newest",
  draft: true,
};

export const defaultHomeModulesData: ModulesPageableDto = {
  entries: [],
  all: null,
  number: null,
  page: 0,
  end: false,
};

export const defaultHomeModules: HomeModulesCollection = {
  loading: false,
  data: defaultHomeModulesData,
  filters: defaultHomeModulesFilters,
};

export const defaultHomeCardsFilters: HomeCardsFilters = {
  search: "",
  created: "newest",
  by: "term",
};

export const defaultHomeCardsData: CardsPageableDto = {
  entries: [],
  all: null,
  number: null,
  page: 0,
  end: false,
};

export const defaultHomeCards: HomeCardsCollection = {
  loading: false,
  data: defaultHomeCardsData,
  filters: defaultHomeCardsFilters,
};

const initState: MainState = {
  is_server: true,
  loading: false,

  module: false,
  draft: false,

  homeModules: defaultHomeModules,

  homeCards: defaultHomeCards,

  cards: {},
  cards_number: false,
  all_cards: false,
  skip_cards: 0,
  all_cards_number: false,
  search_cards: {
    value: "",
  },

  select_by: { value: "term", label: "Term" },
  select_created: { value: "newest", label: "Newest" },

  scroll_top: false,
};

export default initState;
