const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cardSchema = new Schema({
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

function cardModelGenerator(username) {
  return mongoose.model(`${username}'s cards`, cardSchema);
}

module.exports = cardModelGenerator;
