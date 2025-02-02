import { CardDto, ModuleDto } from "@common/api/entities";
import { PaginationDto } from "@common/api/methods/pagedData";
import { CaseReducer } from "@reduxjs/toolkit";
import { Action } from "@store/types";

export type FilterValue = string | number | boolean | undefined;

export type DefaultFilters = {
  [key: string]: FilterValue;
  search?: string;
};

export type Pagination = PaginationDto;

export type Section<Filters extends DefaultFilters> = {
  loading: boolean;
  filters?: Filters;
  pagination?: Pagination;
};

export type HomeModuleFilters = DefaultFilters & {
  created?: "newest" | "oldest";
  draft?: boolean;
  sr?: boolean;
};

export type HomeModulesSection = Section<HomeModuleFilters>;

export type HomeCardsFilters = DefaultFilters & {
  created?: "newest" | "oldest";
  by?: "term" | "definition";
  sr?: boolean;
};

export type HomeCardsSection = Section<HomeCardsFilters>;

export type SectionName = "homeModules" | "homeCards";

export type MainState = {
  is_server: boolean;

  loading: boolean;

  module: Module | null;
  modules: ModuleDto[];

  draft: ModuleDto | false; // why we need this?

  // home cards
  cards: Cards;
  cards_number: number | false;
  all_cards: boolean;
  skip_cards: number;
  all_cards_number: number | false;
  search_cards: {
    value: string;
  };

  sections: {
    homeModules: HomeModulesSection;
    homeCards: HomeCardsSection;
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
  module_loading: boolean; // can be renamed
};

export type Module = ModuleDto & ModuleFields;

// ===============================

export type MainCaseReducer<P = undefined> = CaseReducer<MainState, Action<P>>;
