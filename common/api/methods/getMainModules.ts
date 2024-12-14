import { Override } from "@common/types";
import { ModulesGetQuery, ModulesGetResponse } from "@server/types/methods";

import { ModuleDto } from "../entities";

export type ModulesGetQueryDto = ModulesGetQuery;
export type ModulesGetResponseDto = Override<
  ModulesGetResponse,
  {
    draft: ModuleDto | null;
    entries: ModuleDto[];
  }
>;
