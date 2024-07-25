import { Card } from "@common/types";
import mongoose, { SortOrder } from "mongoose";

const Schema = mongoose.Schema;

export type CardSortObj = { [key in keyof Card]?: SortOrder };

const CardSchema = new Schema<Card>({
  moduleID: String,
  term: String,
  definition: String,
  imgurl: String,
  creation_date: Date,
  studyRegime: Boolean,
  stage: Number,
  nextRep: Date,
  prevStage: Date,
  lastRep: Date,
  author_id: String,
  author: String,
});

const cardModel = mongoose.model<Card>(`Cards`, CardSchema);

export default cardModel;
