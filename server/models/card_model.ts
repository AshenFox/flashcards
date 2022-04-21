// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface ICard {
  _id: string;
  moduleID: string;
  term: string;
  defenition: string;
  imgurl: string;
  creation_date: Date;
  studyRegime: boolean;
  stage: number;
  nextRep: Date;
  prevStage: Date;
  lastRep: Date;
}

const cardSchema = new Schema<ICard>({
  moduleID: String,
  term: String,
  defenition: String,
  imgurl: String,
  creation_date: Date,
  studyRegime: Boolean,
  stage: Number,
  nextRep: Date,
  prevStage: Date,
  lastRep: Date,
});

function cardModelGenerator(username: string) {
  return mongoose.model<ICard>(`${username}'s cards`, cardSchema);
}

// module.exports = cardModelGenerator;
export default cardModelGenerator;
