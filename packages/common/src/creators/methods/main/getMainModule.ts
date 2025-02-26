import { ModuleCreator } from "@common/creators/entities";

import { PagedDataCreator } from "../pagedData";

export type GetMainModuleQueryCreator = {
  _id?: string;
  search?: string;
  created?: "newest" | "oldest";
  by?: "term" | "definition";
  sr?: boolean;
};

export type GetMainModuleResponseCreator<
  Module = ModuleCreator,
  PagedData = PagedDataCreator,
> = {
  module: Module;
  cards: PagedData;
};
