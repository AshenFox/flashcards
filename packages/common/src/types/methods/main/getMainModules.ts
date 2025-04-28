import { DefaultOptions } from "@common/types";

import { Module, ModuleCreator, ModuleDto } from "../../entities";
import {
  PagedDataCreator,
  Pagination,
  PaginationCreator,
  PaginationDto,
} from "../pagedData";

type GetMainModulesQueryCreator = {
  page?: number;
  search?: string;
  created?: "newest" | "oldest";
  draft?: boolean;
  sr?: boolean;
};
type GetMainModulesResponseCreator<
  Module extends ModuleCreator<DefaultOptions>,
  PagedData extends PagedDataCreator<unknown, PaginationCreator>,
> = {
  draft: Module | null;
  modules: PagedData;
};

// server types
export type GetMainModulesQuery = GetMainModulesQueryCreator;
export type GetMainModulesPageable = PagedDataCreator<Module, Pagination>;
export type GetMainModulesResponse = GetMainModulesResponseCreator<
  Module,
  GetMainModulesPageable
>;

// api types
export type GetMainModulesQueryDto = GetMainModulesQueryCreator;
export type GetMainModulesPageableDto = PagedDataCreator<
  ModuleDto,
  PaginationDto
>;
export type GetMainModulesResponseDto = GetMainModulesResponseCreator<
  ModuleDto,
  GetMainModulesPageableDto
>;
