import {
  CardsGetQueryCreator,
  CardsGetResponseCreator,
  PageableCreator,
} from "@common/creators/methods";
import { Card } from "types/entities";

export type CardsGetQuery = CardsGetQueryCreator;
export type CardsPageable = PageableCreator<Card>;
export type CardsGetResponse = CardsGetResponseCreator<CardsPageable>;
