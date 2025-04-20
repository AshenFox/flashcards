import { ModuleCreator } from "@common/creators/entities";

import { PagedDataCreator } from "../pagedData";

export type GetMainModuleQueryCreator = {
  _id?: string;
  search?: string;
  created?: "newest" | "oldest" | "no-order";
  by?: "term" | "definition";
  sr?: "all" | "in-lowest" | "in-highest" | "out";
};

export type GetMainModuleResponseCreator<
  Module = ModuleCreator,
  PagedData = PagedDataCreator,
> = {
  module: Module;
  cards: PagedData;
};
