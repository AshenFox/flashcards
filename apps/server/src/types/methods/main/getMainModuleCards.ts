import {
  GetMainModuleCardsQueryCreator,
  GetMainModuleCardsResponseCreator,
  PagedDataCreator,
} from "@common/creators/methods";
import { Card } from "types/entities";

export type GetMainModuleCardsQuery = GetMainModuleCardsQueryCreator;
export type MainModuleCardsPageable = PagedDataCreator<Card>;
export type GetMainModuleCardsResponse =
  GetMainModuleCardsResponseCreator<MainModuleCardsPageable>;
