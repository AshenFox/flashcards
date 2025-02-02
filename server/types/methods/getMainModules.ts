import {
  ModulesGetQueryCreator,
  ModulesGetResponseCreator,
  PagedDataCreator,
} from "@common/creators/methods";
import { Module } from "types/entities";

export type ModulesGetQuery = ModulesGetQueryCreator;
export type ModulesPageable = PagedDataCreator<Module>;
export type ModulesGetResponse = ModulesGetResponseCreator<
  Module,
  ModulesPageable
>;
