const Game = require("../models/Game");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const saveNewGame = _game_id => {
  return new Promise((resolve, reject) => {
    Game.findOne({
      where: {
        game_id: { [Op.like]: _game_id }
      }
    })
      .then(game => {
        if (game) {
          reject("Game already added");
        } else if (!game) {
          console.log("Adding Game");
          let newGame = new Game({
            game_id: _game_id
          });
          newGame
            .save()
            .then(game => {
              resolve(game);
            })
            .catch(err => {
              reject(err);
            });
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = saveNewGame;
