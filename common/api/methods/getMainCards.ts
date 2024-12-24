import {
  CardsGetQueryCreator,
  CardsGetResponseCreator,
} from "@common/creators/methods";
import { PageableCreator } from "@common/creators/methods";

import { CardDto } from "../entities";

export type CardsGetQueryDto = CardsGetQueryCreator;
export type CardsPageableDto = PageableCreator<CardDto>;
export type CardsGetResponseDto = CardsGetResponseCreator<CardsPageableDto>;
