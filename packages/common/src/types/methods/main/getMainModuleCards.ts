import { Card, CardDto } from "@common/types/entities";

import {
  PagedDataCreator,
  Pagination,
  PaginationCreator,
  PaginationDto,
} from "../pagedData";

type QueryCreator = {
  _id?: string;
};

type ResponseCreator<
  PagedData extends PagedDataCreator<unknown, PaginationCreator>,
> = PagedData;

// server types
export type GetMainModuleCardsQuery = QueryCreator;
export type GetMainModuleCardsPageable = PagedDataCreator<Card, Pagination>;
export type GetMainModuleCardsResponse =
  ResponseCreator<GetMainModuleCardsPageable>;

// api types
export type GetMainModuleCardsQueryDto = QueryCreator;
export type GetMainModuleCardsPageableDto = PagedDataCreator<
  CardDto,
  PaginationDto
>;
export type GetMainModuleCardsResponseDto =
  ResponseCreator<GetMainModuleCardsPageableDto>;
