import { CardDto, ModuleDto } from "@flashcards/common";
import { PaginationDto } from "@flashcards/common";
import { CaseReducer } from "@reduxjs/toolkit";
import { Action } from "@store/types";

export type FilterValue = string | number | boolean | undefined;

export type DefaultFilters = {
  [key: string]: FilterValue;
  search?: string;
};

export type DefaultPagination = PaginationDto;

export type Section<
  Filters extends DefaultFilters | undefined = DefaultFilters,
  Pagination extends DefaultPagination | undefined = DefaultPagination,
> = {
  loading: boolean;
  filters?: Filters;
  pagination?: Pagination;
};

export type HomeModulesFilters = DefaultFilters & {
  created?: "newest" | "oldest";
  draft?: boolean;
  sr?: boolean;
};
export type HomeModulesSection = Section<HomeModulesFilters>;

export type HomeCardsFilters = DefaultFilters & {
  created?: "newest" | "oldest";
  by?: "term" | "definition";
  sr?: "all" | "in-lowest" | "in-highest" | "out";
};
export type HomeCardsSection = Section<HomeCardsFilters>;

export type SRCardsSection = Section<undefined, undefined>;

export type ModuleFilters = DefaultFilters & {
  created?: "newest" | "oldest" | "no-order";
  by?: "term" | "definition";
  sr?: "all" | "in-lowest" | "in-highest" | "out";
};
export type ModuleSection = Section<ModuleFilters>;

export type ModuleCardsSection = Section<undefined>;

export type EditDraftSection = Section<undefined>;

export type SectionName =
  | "homeModules"
  | "homeCards"
  | "srCards"
  | "module"
  | "moduleCards"
  | "editDraft";

export type MainState = {
  is_server: boolean;

  module: Module | null;

  modules: ModuleDto[];
  cards: Cards;

  sections: {
    homeModules: HomeModulesSection;
    homeCards: HomeCardsSection;
    srCards: SRCardsSection;
    module: ModuleSection;
    moduleCards: ModuleCardsSection;
    editDraft: EditDraftSection;
  };

  scroll_top: boolean; // move to local component value
};

export type ImgurlFields = {
  ok: boolean;
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
  sr: {
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
  module_loading: boolean; // can be renamed
};

export type Module = ModuleDto & ModuleFields;

// Scrape
// ===============================

export type CodSection = {
  part_of_speech: string;
  sub_sections: {
    blocks: {
      definition: string;
      examples: string[];
    }[];
    guideword: string;
  }[];
  transcr_uk: string;
  transcr_us: string;
};

export type CodReply = CodSection[];

export type CodDictResult = {
  type: "cod";
  data: CodReply;
};

export type UrbanPanel = {
  definition: string;
  example: string;
};

export type UrbanReply = UrbanPanel[];

export type UrbanDictResult = {
  type: "urban";
  data: UrbanReply;
};

// ===============================

export type MainCaseReducer<P = undefined> = CaseReducer<MainState, Action<P>>;
