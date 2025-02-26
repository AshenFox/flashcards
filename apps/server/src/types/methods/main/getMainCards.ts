import {
  GetMainCardsQueryCreator,
  GetMainCardsResponseCreator,
  PagedDataCreator,
} from "@common/creators/methods";
import { Card } from "types/entities";

export type GetMainCardsQuery = GetMainCardsQueryCreator;
export type MainCardsPageable = PagedDataCreator<Card>;
export type GetMainCardsResponse =
  GetMainCardsResponseCreator<MainCardsPageable>;
