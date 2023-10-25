const asyncHandler = require('express-async-handler');
const Game = require('../models/game');
const CurrentGame = require('../models/current_game');

exports.load_game = asyncHandler(async (req, res, next) => {
  console.log('loading game');
  try {
    const game = await Game.find({ name: req.params.name })
      .populate('locations')
      .exec();
    const characters = game[0].locations.map((location) => {
      return location.character;
    });
    const newGame = new CurrentGame({
      all_markers: game[0].locations,
      time: Date.now()
    });

    await newGame.save();
    res.status(200).json({
      img_link: game[0].img_link,
      characters,
      currentgameId: newGame._id,
      gameId: game[0]._id
    });
  } catch (err) {
    console.log('error' + err);
  }
});
