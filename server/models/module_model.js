const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const moduleSchema = new Schema({
  title: String,
  author: String,
  author_id: String,
  cards: [String],
  number: Number,
  creation_date: Date,
  draft: Boolean,
});

function moduleModelGenerator(username) {
  return mongoose.model(`${username}'s module`, moduleSchema);
}

module.exports = moduleModelGenerator;
