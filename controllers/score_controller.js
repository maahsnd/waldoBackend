const asyncHandler = require('express-async-handler');
const CurrentGame = require('../models/current_game');
const Score = require('../models/score');
const Game = require('../models/game');

exports.get_scores = asyncHandler(async (req, res, next) => {
  try {
    const game = await Game.find({ name: 'waldo' });
    const data = await Score.find({ game: game[0]._id, name: {$ne: 'anonymous'} })
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
    const { currentgameId, winTime } = req.body;

    const currentGame = await CurrentGame.findByIdAndDelete(currentgameId);
    const start_time = new Date(currentGame.time);

    const time = Math.floor((winTime - start_time) / 1000);

    const newScore = new Score({
      time: time,
      game: req.body.gameId
    });
    await newScore.save();
    res.json({ time: newScore.time, scoreId: newScore._id });
  } catch (err) {
    console.error(err);
  }
});

exports.post_username = asyncHandler(async (req, res, next) => {
  try {
    const { scoreId, username, time, gameId } = req.body;
    const newScore = new Score({
      name: username,
      time: time,
      game: gameId,
      _id: scoreId
    });
    await Score.findByIdAndUpdate(scoreId, newScore, {});
    const data = await Score.find({ game: req.body.gameId })
      .sort({ time: 1 })
      .limit(3)
      .exec();
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});
