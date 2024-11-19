import { Module } from "@common/types";
import mongoose, { SortOrder } from "mongoose";

const Schema = mongoose.Schema;

export type ModuleSortObj = { [key in keyof Module]?: SortOrder };

const ModuleSchema = new Schema<Module>({
  title: String,
  author: String,
  author_id: String,
  cards: [String],
  number: Number,
  numberSR: Number,
  creation_date: Date,
  draft: Boolean,
});

const moduleModel = mongoose.model<Module>(`Modules`, ModuleSchema);

export default moduleModel;
