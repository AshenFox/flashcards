import { Card } from "@flashcards/common";
import mongoose, { SortOrder } from "mongoose";

const Schema = mongoose.Schema;

export type CardSortObj = {
  [key in keyof Card]?: SortOrder | { $meta: "textScore" };
};

export const cardModelName = "Cards";

const CardSchema = new Schema<Card>({
  moduleID: {
    type: Schema.Types.ObjectId,
    ref: "Modules",
    required: true,
  },
  term: String,
  definition: String,
  imgurl: String,
  creation_date: Date,
  studyRegime: Boolean,
  stage: Number,
  nextRep: Date,
  prevStage: Date,
  lastRep: Date,
  author_id: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  author: String,
  // order: Number, // delete later
});

const cardModel = mongoose.model<Card>(cardModelName, CardSchema);

export default cardModel;
