const asyncHandler = require('express-async-handler');
const Game = require('../models/game');

exports.load_game = asyncHandler(async (req, res, next) => {
  const [imageLink, Locations] = await Game.find({ name: req.body.name });
});
