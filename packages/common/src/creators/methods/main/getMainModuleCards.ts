import { PagedDataCreator } from "../pagedData";

export type GetMainModuleCardsQueryCreator = {
  _id?: string;
};

export type GetMainModuleCardsResponseCreator<PagedData = PagedDataCreator> =
  PagedData;
