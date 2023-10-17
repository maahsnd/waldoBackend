const express = require('express');
const router = express.Router();
const coord_controller = require('../controllers/coordinate_controller');
const game_controller = require('../controllers/game_controller');

router.get('/', function (req, res) {
  res.redirect('/games');
});
/* Route to start game
Return image, log start time*/
router.get('/games/:name', game_controller.load_game);

/* Route to check coords
Compare coordinates to DB
Return response */
router.post('/games/:name/coords', coord_controller.check_coordinates);

/* Route to submit user name to scores */
router.post('/games/:name/scores');

/* Route to fetch top three scores*/
router.get('/games/:name/scores');

module.exports = router;
