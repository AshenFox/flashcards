import { Module } from "@flashcards/common";
import mongoose, { SortOrder } from "mongoose";

const Schema = mongoose.Schema;

export type ModuleSortObj = { [key in keyof Module]?: SortOrder };

const ModuleSchema = new Schema<Module>({
  title: String,
  author: String,
  author_id: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  numberSR: { type: Number, default: 0 },
  cards: [{ type: Schema.Types.ObjectId, ref: "Cards" }],
  creation_date: Date,
  draft: Boolean,
  tags: [String],
});

ModuleSchema.set("toObject", { virtuals: true });
ModuleSchema.set("toJSON", { virtuals: true });

const moduleModel = mongoose.model<Module>("Modules", ModuleSchema);

export default moduleModel;
