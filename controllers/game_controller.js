const asyncHandler = require('express-async-handler');
const Game = require('../models/game');
const Location = require('../models/location');

exports.load_game = asyncHandler(async (req, res, next) => {
  console.log('loading game');
  try {
    const game = await Game.find({ name: req.params.name })
      .populate('locations')
      .exec();
    res
      .status(200)
      .json({ img_link: game[0].img_link, locations: game[0].locations });
  } catch (err) {
    console.log('error' + err);
  }
});
