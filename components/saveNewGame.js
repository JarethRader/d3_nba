const Game = require("../models/Game");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const saveNewGame = _game_id => {
  console.log(_game_id);

  return new Promise((resolve, reject) => {
    Game.findOne({
      where: {
        game_id: { [Op.like]: _game_id }
      }
    })
      .then(async game => {
        if (game !== null) {
          reject("Game already added");
        } else if (!game) {
          console.log("Adding Game");
          let newGame = new Game({
            game_id: _game_id
          });
          // console.log(newGame);
          await newGame
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
