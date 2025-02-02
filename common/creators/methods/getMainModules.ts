import { ModuleCreator } from "../entities";
import { PagedDataCreator } from "./pagedData";

export type ModulesGetQueryCreator = {
  page?: number;
  search?: string;
  created?: "newest" | "oldest";
  draft?: boolean;
  sr?: boolean;
};
export type ModulesGetResponseCreator<
  Module = ModuleCreator,
  PagedData = PagedDataCreator,
> = {
  draft: Module | null;
  modules: PagedData;
};
