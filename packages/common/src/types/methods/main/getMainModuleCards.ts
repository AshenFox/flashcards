import { Card, CardDto } from "@common/types/entities";

import {
  PagedDataCreator,
  Pagination,
  PaginationCreator,
  PaginationDto,
} from "../pagedData";

type GetMainModuleCardsQueryCreator = {
  _id?: string;
};

type GetMainModuleCardsResponseCreator<
  PagedData extends PagedDataCreator<unknown, PaginationCreator>,
> = PagedData;

// server types
export type GetMainModuleCardsQuery = GetMainModuleCardsQueryCreator;
export type GetMainModuleCardsPageable = PagedDataCreator<Card, Pagination>;
export type GetMainModuleCardsResponse =
  GetMainModuleCardsResponseCreator<GetMainModuleCardsPageable>;

// api types
export type GetMainModuleCardsQueryDto = GetMainModuleCardsQueryCreator;
export type GetMainModuleCardsPageableDto = PagedDataCreator<
  CardDto,
  PaginationDto
>;
export type GetMainModuleCardsResponseDto =
  GetMainModuleCardsResponseCreator<GetMainModuleCardsPageableDto>;
