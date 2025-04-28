import { Card } from "@flashcards/common";
import mongoose, { SortOrder } from "mongoose";

const Schema = mongoose.Schema;

export type CardSortObj = {
  [key in keyof Card]?: SortOrder | { $meta: "textScore" };
};

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
  order: Number,
});

const cardModel = mongoose.model<Card>(`Cards`, CardSchema);

export default cardModel;
