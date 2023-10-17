const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CurrentGameSchema = new Schema({
  found_markers: [{ type: String }],
  time: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('CurrentGame', CurrentGameSchema);
