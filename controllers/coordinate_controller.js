const asyncHandler = require('express-async-handler');
const Location = require('../models/location');
const CurrentGame = require('../models/current_game');

exports.check_coordinates = asyncHandler(async (req, res, next) => {
  const data = await Location.find(
    {
      character: req.body.character
    },
    'coords'
  ).exec();
  const click = req.body.coords;
  const location = data[0].coords;

  const match =
    location.x_min <= click.x &&
    location.x_max >= click.x &&
    location.y_min <= click.y &&
    location.y_max >= click.y;
  //click does not match coordinates
  if (!match) {
    res.json({
      found: false,
      win: false
    });
    return;
  }

  const currentGame = await CurrentGame.findById(req.body.gameId).exec();
  //click coordinates already found
  if (currentGame.found_markers.includes(match.character)) {
    console.error('Already found');
    res.json({
      found: false,
      win: false
    });
    return;
  }

  const foundArr = currentGame.found_markers;
  //click is the last location to be found (win)
  if (foundArr.length === currentGame.all_markers.length - 1) {
    res.json({
      found: true,
      win: true
    });
    return;
  }
  //else click is found
  const updatedGame = {
    found_markers: [...foundArr, match.character]
  };

  await CurrentGame.findByIdAndUpdate(req.params.id, updatedGame, {});
  res.json({
    found: true,
    win: false
  });
  return;
});
