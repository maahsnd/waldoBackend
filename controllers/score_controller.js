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
    const { username, gameId, currentGameId, winTime } = req.body;
    // Now you can use these variables in your route handler
    //start time is Date.now() form, as is endTime
    const currentGame = await CurrentGame.findById(currentGameId);
    const start_time = new Date(currentGame.time);
    //get time in seconds from miliseconds
    const time = (winTime - start_time.getTime()) / 1000;
    console.log(start_time.getTime(), winTime, time);
    const newScore = new Score({
      name: req.body.username,
      time,
      game: req.body.gameId
    });
    await newScore.save();
    const data = await Score.find({ game: req.body.gameId })
      .sort('time')
      .limit(3)
      .exec();
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});
