import {
  GetMainModuleCardsQueryCreator,
  GetMainModuleCardsResponseCreator,
  PagedDataCreator,
} from "@flashcards/common";
import { Card } from "@serverTypes/entities";

export type GetMainModuleCardsQuery = GetMainModuleCardsQueryCreator;
export type MainModuleCardsPageable = PagedDataCreator<Card>;
export type GetMainModuleCardsResponse =
  GetMainModuleCardsResponseCreator<MainModuleCardsPageable>;
