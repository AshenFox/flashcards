import {
  ModulesGetQueryCreator,
  PageableCreator,
} from "@common/creators/methods";
import { Module } from "types/entities";

export type ModulesGetQuery = ModulesGetQueryCreator;
export type ModulesPageable = PageableCreator<Module>;
export type ModulesGetResponse = {
  draft: Module | null;
  modules: ModulesPageable;
};
