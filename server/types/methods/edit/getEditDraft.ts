import {
  GetEditDraftQueryCreator,
  GetEditDraftResponseCreator,
  PagedDataCreator,
} from "@common/creators/methods";

import { Card, Module } from "../../entities";

export type GetEditDraftQuery = GetEditDraftQueryCreator;
export type EditDraftPageable = PagedDataCreator<Card>;
export type GetEditDraftResponse = GetEditDraftResponseCreator<
  Module,
  EditDraftPageable
>;
