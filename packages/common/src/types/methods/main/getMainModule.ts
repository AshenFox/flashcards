import { DefaultOptions } from "@common/types";
import { Module, ModuleCreator, ModuleDto } from "@common/types/entities";

type ResponseCreator<ModuleType extends ModuleCreator<DefaultOptions>> = {
  module: ModuleType;
};

// server types
export type GetMainModuleQuery = {
  _id?: string;
};
export type GetMainModuleResponse = ResponseCreator<Module>;

// api types
export type GetMainModuleQueryDto = {
  _id?: string;
};
export type GetMainModuleResponseDto = ResponseCreator<ModuleDto>;
