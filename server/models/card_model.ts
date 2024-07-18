import mongoose, { SortOrder } from "mongoose";

const Schema = mongoose.Schema;

export interface ICardBase {
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

export interface ICard extends ICardBase {
  _id: string;
}

export type ICardSortObj = { [key in keyof ICard]?: SortOrder };

const CardSchema = new Schema<ICard>({
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

const cardModel = mongoose.model<ICard>(`Cards`, CardSchema);

export default cardModel;
