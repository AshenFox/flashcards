import { PagedDataCreator } from "../pagedData";

export type GetMainCardsQueryCreator = {
  page?: number;
  search?: string;
  created?: "newest" | "oldest";
  by?: "term" | "definition";
  sr?: "all" | "in-lowest" | "in-highest" | "out";
};

export type GetMainCardsResponseCreator<PagedData = PagedDataCreator> =
  PagedData;
