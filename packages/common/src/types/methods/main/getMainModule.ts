import { DefaultOptions } from "@common/types";
import {
  Card,
  CardDto,
  Module,
  ModuleCreator,
  ModuleDto,
} from "@common/types/entities";

import {
  PagedDataCreator,
  Pagination,
  PaginationCreator,
  PaginationDto,
} from "../pagedData";

type QueryCreator = {
  _id?: string;
  search?: string;
  created?: "newest" | "oldest" | "no-order";
  by?: "term" | "definition";
  sr?: "all" | "in-lowest" | "in-highest" | "out";
};

type ResponseCreator<
  Module extends ModuleCreator<DefaultOptions>,
  PagedData extends PagedDataCreator<unknown, PaginationCreator>,
> = {
  module: Module;
  cards: PagedData;
};

// server types
export type GetMainModuleQuery = QueryCreator;
export type GetMainModulePageable = PagedDataCreator<Card, Pagination>;
export type GetMainModuleResponse = ResponseCreator<
  Module,
  GetMainModulePageable
>;

// api types
export type GetMainModuleQueryDto = QueryCreator;
export type GetMainModulePageableDto = PagedDataCreator<CardDto, PaginationDto>;
export type GetMainModuleResponseDto = ResponseCreator<
  ModuleDto,
  GetMainModulePageableDto
>;
