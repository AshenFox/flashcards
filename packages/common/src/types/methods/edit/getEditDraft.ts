import { DefaultOptions } from "@common/types";
import {
  Card,
  CardDto,
  Module,
  ModuleCreator,
  ModuleDto,
} from "@common/types/entities";

import {
  PagedDataCreator,
  Pagination,
  PaginationCreator,
  PaginationDto,
} from "../pagedData";

type GetEditDraftQueryCreator = {
  _id?: string;
};

type GetEditDraftResponseCreator<
  Module = ModuleCreator<DefaultOptions>,
  PagedData = PagedDataCreator<unknown, PaginationCreator>,
> = {
  module: Module;
  cards: PagedData;
};

// server types
export type GetEditDraftQuery = GetEditDraftQueryCreator;
export type GetEditDraftPageable = PagedDataCreator<Card, Pagination>;
export type GetEditDraftResponse = GetEditDraftResponseCreator<
  Module,
  GetEditDraftPageable
>;

// api types
export type GetEditDraftQueryDto = GetEditDraftQueryCreator;
export type GetEditDraftPageableDto = PagedDataCreator<CardDto, PaginationDto>;
export type GetEditDraftResponseDto = GetEditDraftResponseCreator<
  ModuleDto,
  GetEditDraftPageableDto
>;
