import {
  GetMainModulesQueryCreator,
  GetMainModulesResponseCreator,
  PagedDataCreator,
} from "@common/creators/methods";
import { Module } from "types/entities";

export type GetMainModulesQuery = GetMainModulesQueryCreator;
export type MainModulesPageable = PagedDataCreator<Module>;
export type GetMainModulesResponse = GetMainModulesResponseCreator<
  Module,
  MainModulesPageable
>;
