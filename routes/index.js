const express = require('express');
const router = express.Router();

/* Route to start game
Return image, log start time*/
router.get('/game');

/* Route to check coords
Compare coordinates to DB
Return response */
router.post('/coords');

/* Route to submit user name to scores */
router.post('/scores');

/* Route to fetch top three scores*/
router.get('/scores');

module.exports = router;
