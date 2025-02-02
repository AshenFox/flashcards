import { PagedDataCreator } from "./pagedData";

export type CardsGetQueryCreator = {
  page?: number;
  search?: string;
  created?: "newest" | "oldest";
  by?: "term" | "definition";
  sr?: boolean;
};

export type CardsGetResponseCreator<PagedData = PagedDataCreator> = PagedData;
