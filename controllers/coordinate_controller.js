const asyncHandler = require('express-async-handler');
const Game = require('../models/game');
const CurrentGame = require('../models/current_game');

exports.check_coordinates = asyncHandler(async (req, res, next) => {
  const locationsArray = await Game.find(
    { name: req.params.name },
    'locations'
  ).exec();
  const click = req.body.coords;

  const match = locationsArray.find((location) => {
    location.x_min <= click.x &&
      location.x_max >= click.x &&
      location.y_min <= click.y &&
      location.y_max >= click.y;
  });
  //click does not match coordinates
  if (!match) {
    res.send({
      found: false,
      win: false
    });
    return;
  }
  const currentGame = await CurrentGame.findById(req.params.id).exec();
  //click coordinates already found
  if (currentGame.found_markers.includes(match.character)) {
    res.send({
      found: false,
      win: false
    });
    return;
  }
  const foundArr = currentGame.found_markers;
  //click is the last location to be found (win)
  if (foundArr.length === locationsArray.length - 1) {
    res.send({
      found: true,
      win: true
    });
    return;
  }
  const updatedGame = {
    found_markers: [...foundArr, match.character]
  };
  await CurrentGame.findByIdAndUpdate(req.params.id, updatedGame, {});
  res.send({
    found: true,
    win: false
  });
  return;
});
