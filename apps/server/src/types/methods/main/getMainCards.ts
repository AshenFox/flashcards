import {
  GetMainCardsQueryCreator,
  GetMainCardsResponseCreator,
  PagedDataCreator,
} from "@flashcards/common";
import { Card } from "@serverTypes/entities";

export type GetMainCardsQuery = GetMainCardsQueryCreator;
export type MainCardsPageable = PagedDataCreator<Card>;
export type GetMainCardsResponse =
  GetMainCardsResponseCreator<MainCardsPageable>;
