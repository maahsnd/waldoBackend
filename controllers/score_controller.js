const asyncHandler = require('express-async-handler');
const CurrentGame = require('../models/current_game');
const Score = require('../models/score');
const Game = require('../models/game');

exports.get_scores = asyncHandler(async (req, res, next) => {
  try {
    const game = await Game.find({ name: req.params.name });
    const data = await Score.find({ game: game[0]._id })
      .sort('time')
      .limit(3)
      .exec();
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});

exports.post_score = asyncHandler(async (req, res, next) => {
  try {
    const { username, gameId, currentgameId, winTime } = req.body;

    const currentGame = await CurrentGame.findByIdAndDelete(currentgameId);
    const start_time = new Date(currentGame.time);

    const time = Math.floor((winTime - start_time) / 1000);

    const newScore = new Score({
      name: req.body.username,
      time: time,
      game: req.body.gameId
    });
    await newScore.save();
    const data = await Score.find({ game: req.body.gameId })
      .sort({ time: 1 })
      .limit(3)
      .exec();
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});
