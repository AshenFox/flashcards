import { Card, CardDto } from "@common/types/entities";

import {
  PagedDataCreator,
  Pagination,
  PaginationCreator,
  PaginationDto,
} from "../pagedData";

type QueryCreator = {
  page?: number;
  search?: string;
  created?: "newest" | "oldest";
  by?: "term" | "definition";
  sr?: "all" | "in-lowest" | "in-highest" | "out";
};

type ResponseCreator<
  PagedData extends PagedDataCreator<unknown, PaginationCreator>,
> = PagedData;

// server types
export type GetMainCardsQuery = QueryCreator;
export type GetMainCardsPageable = PagedDataCreator<Card, Pagination>;
export type GetMainCardsResponse = ResponseCreator<GetMainCardsPageable>;

// api types
export type GetMainCardsQueryDto = QueryCreator;
export type GetMainCardsPageableDto = PagedDataCreator<CardDto, PaginationDto>;
export type GetMainCardsResponseDto = ResponseCreator<GetMainCardsPageableDto>;
