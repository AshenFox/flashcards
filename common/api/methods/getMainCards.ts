import {
  CardsGetQueryCreator,
  CardsGetResponseCreator,
  PagedDataCreator,
} from "@common/creators/methods";

import { CardDto } from "../entities";

export type CardsGetQueryDto = CardsGetQueryCreator;
export type CardsPageableDto = PagedDataCreator<CardDto>;
export type CardsGetResponseDto = CardsGetResponseCreator<CardsPageableDto>;
