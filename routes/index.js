const express = require('express');
const router = express.Router();
const coord_controller = require('../controllers/coordinate_controller');
const game_controller = require('../controllers/game_controller');
const score_controller = require('../controllers/score_controller');

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

/* Route to fetch top three scores */
router.get('/games/:name/scores', score_controller.get_scores);

/* Route to submit user name & finish time to scores. Return new top three scores */
router.post('/games/:name/scores', score_controller.post_score);

router.post('/games/:name/scores/username', score_controller.post_username);

module.exports = router;
