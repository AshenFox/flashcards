import { DefaultOptions } from "@common/types";

import { Module, ModuleCreator, ModuleDto } from "../../entities";
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
  draft?: boolean;
  sr?: boolean;
};
type ResponseCreator<
  Module extends ModuleCreator<DefaultOptions>,
  PagedData extends PagedDataCreator<unknown, PaginationCreator>,
> = {
  draft: Module | null;
  modules: PagedData;
};

// server types
export type GetMainModulesQuery = QueryCreator;
export type GetMainModulesPageable = PagedDataCreator<Module, Pagination>;
export type GetMainModulesResponse = ResponseCreator<
  Module,
  GetMainModulesPageable
>;

// api types
export type GetMainModulesQueryDto = QueryCreator;
export type GetMainModulesPageableDto = PagedDataCreator<
  ModuleDto,
  PaginationDto
>;
export type GetMainModulesResponseDto = ResponseCreator<
  ModuleDto,
  GetMainModulesPageableDto
>;
