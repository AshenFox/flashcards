import {
  ModulesGetQueryCreator,
  ModulesGetResponseCreator,
  PagedDataCreator,
} from "@common/creators/methods";

import { ModuleDto } from "../entities";

export type ModulesGetQueryDto = ModulesGetQueryCreator;
export type ModulesPagedDataDto = PagedDataCreator<ModuleDto>;
export type ModulesGetResponseDto = ModulesGetResponseCreator<
  ModuleDto,
  ModulesPagedDataDto
>;
