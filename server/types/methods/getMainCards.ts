import {
  CardsGetQueryCreator,
  CardsGetResponseCreator,
  PagedDataCreator,
} from "@common/creators/methods";
import { Card } from "types/entities";

export type CardsGetQuery = CardsGetQueryCreator;
export type CardsPageable = PagedDataCreator<Card>;
export type CardsGetResponse = CardsGetResponseCreator<CardsPageable>;
