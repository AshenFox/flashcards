import { DefaultOptions } from "@common/types";
import { Module, ModuleCreator, ModuleDto } from "@common/types/entities";

type ResponseCreator<ModuleType extends ModuleCreator<DefaultOptions>> = {
  module: ModuleType;
};

type QueryCreator = {
  _id?: string;
};

// server types
export type GetEditDraftQuery = QueryCreator;
export type GetEditDraftResponse = ResponseCreator<Module>;

// api types
export type GetEditDraftQueryDto = QueryCreator;
export type GetEditDraftResponseDto = ResponseCreator<ModuleDto>;
