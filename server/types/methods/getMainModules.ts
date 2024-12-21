import {
  ModulesGetQueryCreator,
  ModulesGetResponseCreator,
  PageableCreator,
} from "@common/creators/methods";
import { Module } from "types/entities";

export type ModulesGetQuery = ModulesGetQueryCreator;
export type ModulesPageable = PageableCreator<Module>;
export type ModulesGetResponse = ModulesGetResponseCreator<
  Module,
  ModulesPageable
>;
