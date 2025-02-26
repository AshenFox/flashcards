import {
  GetMainModulesQueryCreator,
  GetMainModulesResponseCreator,
  PagedDataCreator,
} from "@common/creators/methods";

import { ModuleDto } from "../../entities";

export type GetMainModulesQueryDto = GetMainModulesQueryCreator;
export type MainModulesPagedDataDto = PagedDataCreator<ModuleDto>;
export type GetMainModulesResponseDto = GetMainModulesResponseCreator<
  ModuleDto,
  MainModulesPagedDataDto
>;
