import { PagedDataCreator } from "../pagedData";

export type GetMainCardsQueryCreator = {
  page?: number;
  search?: string;
  created?: "newest" | "oldest";
  by?: "term" | "definition";
  sr?: boolean;
};

export type GetMainCardsResponseCreator<PagedData = PagedDataCreator> =
  PagedData;
