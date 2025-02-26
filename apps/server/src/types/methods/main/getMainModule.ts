import {
  GetMainModuleQueryCreator,
  GetMainModuleResponseCreator,
  PagedDataCreator,
} from "@flashcards/common/src/creators/methods";
import { Card, Module } from "@serverTypes/entities";

export type GetMainModuleQuery = GetMainModuleQueryCreator;
export type MainModulePageable = PagedDataCreator<Card>;
export type GetMainModuleResponse = GetMainModuleResponseCreator<
  Module,
  MainModulePageable
>;
