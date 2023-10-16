const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GameSchema = new Schema({
  img_link: { type: String, required: true, maxLength: 40 },
  locations: [{ type: Schema.Types.ObjectId, ref: 'Location', required: true }]
});

module.exports = mongoose.model('Location', LocationSchema);
