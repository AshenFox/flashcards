import { Card } from "@flashcards/common";
import mongoose, { SortOrder } from "mongoose";

import moduleModel from "./module_model";

const Schema = mongoose.Schema;

export type CardSortObj = {
  [key in keyof Card]?: SortOrder;
};

const CardSchema = new Schema<Card>({
  moduleID: { type: Schema.Types.ObjectId, ref: "Modules", required: true },
  term: String,
  definition: String,
  imgurl: String,
  creation_date: Date,
  studyRegime: Boolean,
  stage: Number,
  nextRep: Date,
  prevStage: Date,
  lastRep: Date,
  author_id: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  author: String,
});

const cardModel = mongoose.model<Card>("Cards", CardSchema);

/**
 * Updates the numberSR field on a module to reflect the current count of cards in study regime
 * @param moduleId The ID of the module to update
 * @param authorId The ID of the author of the module and cards
 */
export async function updateModuleNumberSR(
  moduleId: mongoose.Types.ObjectId,
  authorId: mongoose.Types.ObjectId,
) {
  if (!moduleId || !authorId) return;

  const numberSR = await cardModel.countDocuments({
    moduleID: moduleId,
    author_id: authorId,
    studyRegime: true,
  });

  await moduleModel.updateOne(
    { _id: moduleId, author_id: authorId },
    { numberSR },
  );
}

export default cardModel;
