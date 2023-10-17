const asyncHandler = require('express-async-handler');
const Game = require('../models/game');
const CurrentGame = require('../models/current_game');
const Location = require('../models/location');

exports.load_game = asyncHandler(async (req, res, next) => {
  console.log('loading game');
  try {
    const game = await Game.find({ name: req.params.name })
      .populate('locations')
      .exec();
    const characters = game[0].locations.map((location) => {
      return location.character;
    });
    const newGame = new CurrentGame({});
    await newGame.save();
    res
      .status(200)
      .json({ img_link: game[0].img_link, characters, gameId: newGame._id });
  } catch (err) {
    console.log('error' + err);
  }
});

//start current game timer
