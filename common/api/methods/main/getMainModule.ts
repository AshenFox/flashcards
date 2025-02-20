import {
  GetMainModuleQueryCreator,
  GetMainModuleResponseCreator,
  PagedDataCreator,
} from "@common/creators/methods";

import { CardDto, ModuleDto } from "../../entities";

export type GetMainModuleQueryDto = GetMainModuleQueryCreator;
export type MainModulePageableDto = PagedDataCreator<CardDto>;
export type GetMainModuleResponseDto = GetMainModuleResponseCreator<
  ModuleDto,
  MainModulePageableDto
>;
