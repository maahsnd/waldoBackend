const asyncHandler = require('express-async-handler');
const CurrentGame = require('../models/current_game');
const Score = require('../models/score');

exports.get_scores = asyncHandler(async (req, res, next) => {
  try {
    const data = await Score.find({ game: req.body.gameId })
      .sort('time')
      .limit(3)
      .exec();
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});

exports.post_score = asyncHandler(async (req, res, next) => {
  //start time is Date.now() form, as is endTime
  const start_time = await CurrentGame.findById(req.body.currentgameId);
  //get time in seconds from miliseconds
  const time = (req.body.winTime - start_time) / 1000;
  const newScore = new Score({
    name: req.body.username,
    time,
    game: req.body.gameId
  });
  await newScore.save();
  const data = await Score.find({ game: req.body.game })
    .sort('time')
    .limit(3)
    .exec();
  res.json(data);
});
