const Sequelize = require("sequelize");
const db = require("../config/database");

const Game = db.define("game", {
  game_id: {
    type: Sequelize.INTEGER
  }
});

module.exports = Game;
