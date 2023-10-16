const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CurrentGameSchema = new Schema({
  found: { type: Number, required: true },
  total_markers: { type: Number, required: true }
});

module.exports = mongoose.model('CurrentGame', CurrentGameSchema);
