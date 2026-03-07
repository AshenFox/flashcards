import { PaginationDto } from "@flashcards/common";

export type FilterValue = string | number | boolean | undefined;


export type DefaultFilters = {
  [key: string]: FilterValue;
  search?: string;
};

export type ModulesFilters = DefaultFilters & {
  created?: "newest" | "oldest";
  draft?: boolean;
  sr?: boolean;
};

export type CardsFilters = DefaultFilters & {
  created?: "newest" | "oldest";
  by?: "term" | "definition";
  sr?: "all" | "in-lowest" | "in-highest" | "out";
};


export const defaultModulesFilters: ModulesFilters = {
  search: "",
  created: "newest",
  draft: true,
};

export const defaultCardsFilters: CardsFilters = {
  search: "",
  created: "newest",
  by: "term",
  sr: "all",
};

export const defaultPagination: PaginationDto = {
  all: null,
  number: null,
  page: 0,
  end: false,
};

export type QueryKey<Filters extends DefaultFilters> = (filters: Filters) => readonly unknown[];

export type FilterStore<Filters extends DefaultFilters> = {
  filters: Filters;
  pagination: PaginationDto | null;
  setFilter: (filter: keyof Filters, value: FilterValue) => void;
  setPagination: (pagination: PaginationDto | null) => void;
  resetFilters: () => void;
  queryKey: QueryKey<Filters>;
};
