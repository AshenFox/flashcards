import mongoose, { SortOrder } from "mongoose";

const Schema = mongoose.Schema;

export interface Module {
  _id: string;
  title: string;
  author: string;
  author_id: string;
  cards: string[];
  number: number;
  creation_date: Date;
  draft: boolean;
}

export type ModuleSortObj = { [key in keyof Module]?: SortOrder };

const ModuleSchema = new Schema<Module>({
  title: String,
  author: String,
  author_id: String,
  cards: [String],
  number: Number,
  creation_date: Date,
  draft: Boolean,
});

const moduleModel = mongoose.model<Module>(`Modules`, ModuleSchema);

export default moduleModel;
