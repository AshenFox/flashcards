import { Module } from "@flashcards/common";
import mongoose, { SortOrder } from "mongoose";

import { cardModelName } from "./card_model";
import { userModelName } from "./user_model";

const Schema = mongoose.Schema;

export type ModuleSortObj = { [key in keyof Module]?: SortOrder };

export const moduleModelName = "Modules";

const ModuleSchema = new Schema<Module>({
  title: String,
  author: String,
  author_id: {
    type: Schema.Types.ObjectId,
    ref: userModelName,
    required: true,
  },
  cards: [{ type: Schema.Types.ObjectId, ref: cardModelName }],
  creation_date: Date,
  draft: Boolean,
});

// number of cards where studyRegime=true
ModuleSchema.virtual("numberSR", {
  ref: cardModelName,
  localField: "_id",
  foreignField: "moduleID",
  count: true,
  match: { studyRegime: true },
});

ModuleSchema.set("toObject", { virtuals: true });
ModuleSchema.set("toJSON", { virtuals: true });

const moduleModel = mongoose.model<Module>(moduleModelName, ModuleSchema);

export default moduleModel;
