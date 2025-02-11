import { CardDto, ModuleDto } from "@common/api/entities";
import { CardsPageableDto, ModulesPageableDto } from "@common/api/methods";
import { PageableCreator } from "@common/creators/methods";

export type FilterValue = string | number | boolean | undefined;

export type DefaultFilters = {
  [key: string]: FilterValue;
  search?: string;
};

export type EntryCollection<
  Pageable extends PageableCreator,
  Filters extends DefaultFilters,
> = {
  loading: boolean;
  data: Pageable;
  filters?: Filters;
};

export type HomeModuleFilters = DefaultFilters & {
  created?: "newest" | "oldest";
  draft?: boolean;
  sr?: boolean;
};

export type HomeModulesCollection = EntryCollection<
  ModulesPageableDto,
  HomeModuleFilters
>;

export type HomeCardsFilters = DefaultFilters & {
  created?: "newest" | "oldest";
  by?: "term" | "definition";
  sr?: boolean;
};

export type HomeCardsCollection = EntryCollection<
  CardsPageableDto,
  HomeCardsFilters
>;

export type EntryCollectionName = "homeModules" | "homeCards";

export type MainState = {
  is_server: boolean;
  loading: boolean;

  module: Module | false;
  draft: ModuleDto | false;

  homeModules: HomeModulesCollection;

  homeCards: HomeCardsCollection;

  // home cards
  cards: Cards;
  cards_number: number | false;
  all_cards: boolean;
  skip_cards: number;
  all_cards_number: number | false;
  search_cards: {
    value: string;
  };

  select_by: SelectBy;
  select_created: SelectCreated;

  scroll_top: boolean; // move to local component value
};

export type SelectBy = {
  value: "term" | "definition";
  label: "Term" | "Definition";
};

export type SelectCreated = {
  value: "newest" | "oldest";
  label: "Newest" | "Oldest";
};

export type ImgurlFields = {
  ok: Boolean;
};

export type ImgurlBase = {
  url: string;
  thumbnail?: string;
  snippet?: string;
  context?: string;
};

export type ImgurlObj = ImgurlFields & ImgurlBase & {};

export type ImgurlObjs = {
  [key: string]: ImgurlObj;
};

export type CardFields = {
  edit: boolean;
  gallery: {
    search: boolean;
    query: string;
    imgurl_obj: ImgurlObjs; // ?????
    loading: boolean;
    loaded: number;
    failed: number;
    all: number;
    position: number;
    width: number;
    error: boolean; // ???
  };
  scrape: {
    loading: boolean;
  };
  save: boolean;
  question: boolean;
};

export type Card = CardDto & CardFields;

export type Cards = {
  [key: string]: Card;
};

export type ModuleFields = {
  question: boolean;
  module_loading: boolean;
};

export type Module = ModuleDto & ModuleFields;

// =================================================

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

const mainInitState: MainState = {
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

export default mainInitState;
