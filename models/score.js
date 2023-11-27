const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  name: { type: String, maxLength: 40 },
  time: { type: Number, required: true },
  game: { type: Schema.Types.ObjectId, ref: 'Game', required: true }
});

module.exports = mongoose.model('Score', ScoreSchema);
