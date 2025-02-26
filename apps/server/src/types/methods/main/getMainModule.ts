import {
  GetMainModuleQueryCreator,
  GetMainModuleResponseCreator,
  PagedDataCreator,
} from "@common/creators/methods";
import { Card, Module } from "types/entities";

export type GetMainModuleQuery = GetMainModuleQueryCreator;
export type MainModulePageable = PagedDataCreator<Card>;
export type GetMainModuleResponse = GetMainModuleResponseCreator<
  Module,
  MainModulePageable
>;
