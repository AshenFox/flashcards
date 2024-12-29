import { CardDto, ModuleDto } from "@common/api/entities";
import { CardsPageableDto, ModulesPageableDto } from "@common/api/methods";
import { PageableCreator } from "@common/creators/methods";
import { CaseReducer } from "@reduxjs/toolkit";
import { Action } from "@store/types";

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

// ===============================

export type MainCaseReducer<P = undefined> = CaseReducer<MainState, Action<P>>;
