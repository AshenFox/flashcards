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

type QueryCreator = {
  _id?: string;
};

type ResponseCreator<
  Module extends ModuleCreator<DefaultOptions>,
  PagedData extends PagedDataCreator<any, PaginationCreator>,
> = {
  module: Module;
  cards: PagedData;
};

// server types
export type GetEditDraftQuery = QueryCreator;
export type GetEditDraftPageable = PagedDataCreator<Card, Pagination>;
export type GetEditDraftResponse = ResponseCreator<
  Module,
  GetEditDraftPageable
>;

// api types
export type GetEditDraftQueryDto = QueryCreator;
export type GetEditDraftPageableDto = PagedDataCreator<CardDto, PaginationDto>;
export type GetEditDraftResponseDto = ResponseCreator<
  ModuleDto,
  GetEditDraftPageableDto
>;
