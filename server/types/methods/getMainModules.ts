import { Module } from "types/entities";

import { Pageable } from "./Pageable";

export type ModulesGetQuery = {
  page?: number;
  search?: string;
  created?: "newest" | "oldest";
  draft?: boolean;
  sr?: boolean;
};

export type ModulesGetResponse = {
  draft: Module | null;
  modules: Pageable<Module>;
};
