import { ModuleCreator } from "../../entities";
import { PagedDataCreator } from "../pagedData";

export type GetMainModulesQueryCreator = {
  page?: number;
  search?: string;
  created?: "newest" | "oldest";
  draft?: boolean;
  sr?: boolean;
};
export type GetMainModulesResponseCreator<
  Module = ModuleCreator,
  PagedData = PagedDataCreator,
> = {
  draft: Module | null;
  modules: PagedData;
};
