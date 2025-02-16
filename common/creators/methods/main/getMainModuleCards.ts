import { PagedDataCreator } from "../pagedData";

export type GetMainModuleCardsQueryCreator = {
  _id?: string;
  search?: string;
  created?: "newest" | "oldest";
  by?: "term" | "definition";
  sr?: boolean;
};

export type GetMainModuleCardsResponseCreator<PagedData = PagedDataCreator> =
  PagedData;
