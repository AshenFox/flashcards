import {
  GetMainModuleCardsQueryCreator,
  GetMainModuleCardsResponseCreator,
  PagedDataCreator,
} from "@common/creators/methods";

import { CardDto } from "../../entities";

export type GetMainModuleCardsQueryDto = GetMainModuleCardsQueryCreator;
export type MainModuleCardsPageableDto = PagedDataCreator<CardDto>;
export type GetMainModuleCardsResponseDto =
  GetMainModuleCardsResponseCreator<MainModuleCardsPageableDto>;
