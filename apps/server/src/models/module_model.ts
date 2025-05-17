import { Module } from "@flashcards/common";
import mongoose, { SortOrder } from "mongoose";

const Schema = mongoose.Schema;

export type ModuleSortObj = { [key in keyof Module]?: SortOrder };

const ModuleSchema = new Schema<Module>({
  title: String,
  author: String,
  author_id: String,
  cards: [{ type: Schema.Types.ObjectId, ref: "Cards" }],
  number: Number, // delete later
  numberSR: Number, // delete later
  creation_date: Date,
  draft: Boolean,
});

const moduleModel = mongoose.model<Module>(`Modules`, ModuleSchema);

export default moduleModel;
