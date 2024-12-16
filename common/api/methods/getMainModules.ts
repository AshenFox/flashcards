import { ModulesGetQuery } from "@server/types/methods";

import { ModuleDto } from "../entities";
import { PageableDto } from "./Pageable";

export type ModulesGetQueryDto = ModulesGetQuery;
export type ModulesGetResponseDto = {
  draft: ModuleDto | null;
  modules: PageableDto<ModuleDto>;
};
