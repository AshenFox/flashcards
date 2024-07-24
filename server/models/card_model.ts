import mongoose, { SortOrder } from "mongoose";

const Schema = mongoose.Schema;

export interface CardBase {
  moduleID: string;
  term: string;
  definition: string;
  imgurl: string;
  creation_date: Date;
  studyRegime: boolean;
  stage: number;
  nextRep: Date;
  prevStage: Date;
  lastRep: Date;
  author_id: string;
  author: string;
}

export interface Card extends CardBase {
  _id: string;
}

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
