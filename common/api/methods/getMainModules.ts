import {
  ModulesGetQueryCreator,
  ModulesGetResponseCreator,
} from "@common/creators/methods";
import { PageableCreator } from "@common/creators/methods";

import { ModuleDto } from "../entities";

export type ModulesGetQueryDto = ModulesGetQueryCreator;
export type ModulesPageableDto = PageableCreator<ModuleDto>;
export type ModulesGetResponseDto = ModulesGetResponseCreator<
  ModuleDto,
  ModulesPageableDto
>;
