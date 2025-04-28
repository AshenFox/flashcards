import { Card, CardDto } from "@common/types/entities";

import {
  PagedDataCreator,
  Pagination,
  PaginationCreator,
  PaginationDto,
} from "../pagedData";

type GetMainCardsQueryCreator = {
  page?: number;
  search?: string;
  created?: "newest" | "oldest";
  by?: "term" | "definition";
  sr?: "all" | "in-lowest" | "in-highest" | "out";
};

type GetMainCardsResponseCreator<
  PagedData extends PagedDataCreator<unknown, PaginationCreator>,
> = PagedData;

// server types
export type GetMainCardsQuery = GetMainCardsQueryCreator;
export type GetMainCardsPageable = PagedDataCreator<Card, Pagination>;
export type GetMainCardsResponse =
  GetMainCardsResponseCreator<GetMainCardsPageable>;

// api types
export type GetMainCardsQueryDto = GetMainCardsQueryCreator;
export type GetMainCardsPageableDto = PagedDataCreator<CardDto, PaginationDto>;
export type GetMainCardsResponseDto =
  GetMainCardsResponseCreator<GetMainCardsPageableDto>;
