const dotenv = require('dotenv').config();

const Game = require('./models/game');
const Location = require('./models/location');
const Score = require('./models/score');

const locations = [];
const games = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // Prepare for Mongoose 7

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(process.env.MONGO);
  console.log('Debug: Should be connected?');
  await createLocations();
  await createGame();
  await createScores();

  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

async function locationCreate(characterName, x_max, x_min, y_max, y_min) {
  const location = new Location({
    character: characterName,
    coords: {
      x_max,
      x_min,
      y_max,
      y_min
    }
  });
  await location.save();
  locations.push(location);
  console.log(`Added location: ${characterName}`);
}

async function gameCreate(name, img_link) {
  const game = new Game({
    name,
    img_link,
    locations
  });
  games.push(game);
  await game.save();

  console.log(`Added game: ${name}`);
}

async function scoreCreate(name) {
  const score = new Score({
    name,
    time: Date.now() - (Date.now() - 100000),
    game: games[0]._id
  });
  await score.save();

  console.log(`Added score: ${name}`);
}

async function createLocations() {
  console.log('Adding locations');
  await Promise.all([
    locationCreate('Waldo', 589.5, 544.5, 657, 585),
    locationCreate('Woof', 755, 740, 261, 243),
    locationCreate('Wenda', 585.5, 555.5, 515, 468),
    locationCreate('Wizard Whitebeard', 879.5, 844.5, 641, 605),
    locationCreate('Odlaw', 779.5, 749.5, 788, 751)
  ]);
}

async function createGame() {
  console.log('Adding game');
  await gameCreate(
    'Wheres waldo',
    'https://res.cloudinary.com/dscsiijis/image/upload/v1697566248/waldo_1_lmlk1d.jpg'
  );
}

async function createScores() {
  console.log('Adding scores');
  await Promise.all([
    scoreCreate('jaa'),
    scoreCreate('laa'),
    scoreCreate('faa'),
    scoreCreate('raa')
  ]);
}
