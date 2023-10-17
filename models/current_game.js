const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CurrentGameSchema = new Schema({
  all_markers: [{ type: String }],
  found_markers: [{ type: String }],
  time: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('CurrentGame', CurrentGameSchema);
