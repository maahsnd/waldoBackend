const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GameSchema = new Schema({
  name: { type: String, required: true },
  img_link: { type: String, required: true },
  locations: [{ type: Schema.Types.ObjectId, ref: 'Location', required: true }]
});

module.exports = mongoose.model('Game', GameSchema);
