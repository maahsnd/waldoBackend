const asyncHandler = require('express-async-handler');
const Location = require('../models/location');
const CurrentGame = require('../models/current_game');

exports.check_coordinates = asyncHandler(async (req, res, next) => {
  const currentGame = await CurrentGame.findById(req.body.currentgameId)
    .populate('all_markers')
    .exec();
  const click = req.body.coords;
  const name = req.body.character;
  const found = currentGame.all_markers.find((element) => {
    return element.character === name;
  });
  const location = found.coords;

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

  //click coordinates already found
  if (currentGame.found_markers.includes(req.body.character)) {
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
    _id: currentGame._id,
    all_markers: currentGame.all_markers,
    found_markers: [...foundArr, req.body.character],
    time: currentGame.time
  };

  await CurrentGame.findByIdAndUpdate(req.body.currentgameId, updatedGame, {});
  res.json({
    found: true,
    win: false
  });
  return;
});
