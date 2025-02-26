import {
  GetMainCardsQueryCreator,
  GetMainCardsResponseCreator,
  PagedDataCreator,
} from "@common/creators/methods";

import { CardDto } from "../../entities";

export type GetMainCardsQueryDto = GetMainCardsQueryCreator;
export type MainCardsPageableDto = PagedDataCreator<CardDto>;
export type GetMainCardsResponseDto =
  GetMainCardsResponseCreator<MainCardsPageableDto>;
