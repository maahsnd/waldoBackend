const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CurrentGameSchema = new Schema({
  found_markers: [{ type: String, required: true }],
  all_markers: [{ type: String, required: true }]
});

module.exports = mongoose.model('CurrentGame', CurrentGameSchema);
