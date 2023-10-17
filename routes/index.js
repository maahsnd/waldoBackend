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
router.post('/coords');

/* Route to submit user name to scores */
router.post('/scores');

/* Route to fetch top three scores*/
router.get('/scores');

module.exports = router;
