import mongoose, { SortOrder } from "mongoose";

const Schema = mongoose.Schema;

export interface IModule {
  _id: string;
  title: string;
  author: string;
  author_id: string;
  cards: string[];
  number: number;
  creation_date: Date;
  draft: boolean;
}

export type IModuleSortObj = { [key in keyof IModule]?: SortOrder };

const ModuleSchema = new Schema<IModule>({
  title: String,
  author: String,
  author_id: String,
  cards: [String],
  number: Number,
  creation_date: Date,
  draft: Boolean,
});

const moduleModel = mongoose.model<IModule>(`Modules`, ModuleSchema);

export default moduleModel;
