import {
  GetEditDraftQueryCreator,
  GetEditDraftResponseCreator,
  PagedDataCreator,
} from "@flashcards/common";

import { Card, Module } from "../../entities";

export type GetEditDraftQuery = GetEditDraftQueryCreator;
export type EditDraftPageable = PagedDataCreator<Card>;
export type GetEditDraftResponse = GetEditDraftResponseCreator<
  Module,
  EditDraftPageable
>;
