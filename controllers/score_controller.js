const asyncHandler = require('express-async-handler');
const CurrentGame = require('../models/current_game');
const Score = require('../models/score');

exports.get_scores = asyncHandler(async (req, res, next) => {
  try {
    const data = await Score.find({ game: req.body.game })
      .sort('time')
      .limit(3)
      .exec();
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});

exports.post_score;
