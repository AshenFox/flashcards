import { ModuleCreator } from "@common/creators/entities";

import { PagedDataCreator } from "../pagedData";

export type GetEditDraftQueryCreator = {
  _id?: string;
};

export type GetEditDraftResponseCreator<
  Module = ModuleCreator,
  PagedData = PagedDataCreator,
> = {
  module: Module;
  cards: PagedData;
};
