import {
  GetMainModulesQueryCreator,
  GetMainModulesResponseCreator,
  PagedDataCreator,
} from "@flashcards/common/src/creators/methods";
import { Module } from "@serverTypes/entities";

export type GetMainModulesQuery = GetMainModulesQueryCreator;
export type MainModulesPageable = PagedDataCreator<Module>;
export type GetMainModulesResponse = GetMainModulesResponseCreator<
  Module,
  MainModulesPageable
>;
