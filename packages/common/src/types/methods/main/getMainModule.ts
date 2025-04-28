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

type GetMainModuleQueryCreator = {
  _id?: string;
  search?: string;
  created?: "newest" | "oldest" | "no-order";
  by?: "term" | "definition";
  sr?: "all" | "in-lowest" | "in-highest" | "out";
};

type GetMainModuleResponseCreator<
  Module extends ModuleCreator<DefaultOptions>,
  PagedData extends PagedDataCreator<unknown, PaginationCreator>,
> = {
  module: Module;
  cards: PagedData;
};

// server types
export type GetMainModuleQuery = GetMainModuleQueryCreator;
export type GetMainModulePageable = PagedDataCreator<Card, Pagination>;
export type GetMainModuleResponse = GetMainModuleResponseCreator<
  Module,
  GetMainModulePageable
>;

// api types
export type GetMainModuleQueryDto = GetMainModuleQueryCreator;
export type GetMainModulePageableDto = PagedDataCreator<CardDto, PaginationDto>;
export type GetMainModuleResponseDto = GetMainModuleResponseCreator<
  ModuleDto,
  GetMainModulePageableDto
>;
