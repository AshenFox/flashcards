import {
  GetEditDraftQueryCreator,
  GetEditDraftResponseCreator,
  PagedDataCreator,
} from "@common/creators/methods";

import { CardDto, ModuleDto } from "../../entities";

export type GetEditDraftQueryDto = GetEditDraftQueryCreator;
export type EditDraftPageableDto = PagedDataCreator<CardDto>;
export type GetEditDraftResponseDto = GetEditDraftResponseCreator<
  ModuleDto,
  EditDraftPageableDto
>;
