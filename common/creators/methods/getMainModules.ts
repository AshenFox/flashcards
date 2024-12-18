import { ModuleCreator } from "../entities";
import { PageableCreator } from "./Pageable";

export type ModulesGetQueryCreator = {
  page?: number;
  search?: string;
  created?: "newest" | "oldest";
  draft?: boolean;
  sr?: boolean;
};
export type ModulesGetResponseCreator<
  Module = ModuleCreator,
  Pageable = PageableCreator,
> = {
  draft: Module | null;
  modules: Pageable;
};
