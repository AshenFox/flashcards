import {
  CardFields,
  DefaultPagination,
  EditDraftSection,
  HomeCardsFilters,
  HomeCardsSection,
  HomeModulesFilters,
  HomeModulesSection,
  ImgurlFields,
  MainState,
  ModuleCardsSection,
  ModuleFields,
  ModuleFilters,
  ModuleSection,
  SRCardsSection,
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
  sr: {
    loading: false,
  },
  save: false,
  question: false,
};

export const module_fields: ModuleFields = {
  question: false,
  module_loading: false,
};

export const url_fields: ImgurlFields = {
  ok: false,
};

export const defaultPagination: DefaultPagination = {
  all: null,
  number: null,
  page: 0,
  end: false,
};

export const defaultHomeModulesFilters: HomeModulesFilters = {
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
  sr: "all",
};

export const defaultHomeCardsSection: HomeCardsSection = {
  loading: false,
  filters: defaultHomeCardsFilters,
  pagination: defaultPagination,
};

export const defaultCardsSRSection: SRCardsSection = {
  loading: false,
};

export const defaultModuleFilters: ModuleFilters = {
  search: "",
  created: "no-order",
  by: "term",
  sr: "all",
};

export const defaultModuleSection: ModuleSection = {
  loading: false,
  filters: defaultModuleFilters,
  pagination: defaultPagination,
};

export const defaultModuleCardsSection: ModuleCardsSection = {
  loading: false,
  pagination: defaultPagination,
};

export const defaultEditDraftSection: EditDraftSection = {
  loading: false,
  pagination: defaultPagination,
};

const initState: MainState = {
  is_server: true,

  module: null,

  modules: [],
  cards: {},

  sections: {
    homeModules: defaultHomeModulesSection,
    homeCards: defaultHomeCardsSection,
    srCards: defaultCardsSRSection,
    module: defaultModuleSection,
    moduleCards: defaultModuleCardsSection,
    editDraft: defaultEditDraftSection,
  },

  scroll_top: false,
};

export default initState;
