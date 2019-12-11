const express = require("express");
const router = express.Router();
const BoxScore = require("../models/BoxScore");
const Game = require("../models/Game");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const axios = require("axios");

const saveNewGame = require("../components/saveNewGame");
const saveNewBoxScore = require("../components/saveNewBoxScore");

//@route GET /gamestats/fetch
router.get("/fetchToday", async (req, res) => {
  console.log(req.query.gamedate);
  const url = `https://stats.nba.com/stats/scoreboardV2?DayOffset=0&LeagueID=00&gameDate=${req.query.gamedate}`;
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  axios
    .get(url, config)
    .then(async data => {
      let games = data.data["resultSets"][0]["rowSet"];
      for (var i = 0; i < games.length; i++) {
        _game_id = games[i][2];

        // checkID = parseInt(_game_id, 10);

        // console.log(checkID);
        try {
          await saveNewGame(_game_id)
            .then(async game => {
              await saveNewBoxScore(game.game_id)
                .then(boxScore => {
                  console.log(boxScore);
                  // res.status(200).json(boxScore);
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(async err => {
              if (err === "Game already added") {
                console.log("Can add new box score");
                await saveNewGame(_game_id)
                  .then(boxscore => {
                    console.log(boxscore);
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }
              console.log(err);
              // res.status(400).json({ err });
            });
        } catch (err) {
          console.log(err);
          res.status(400).json({ err });
        }
      }
      res.status(200).json({ success: true });
    })
    .catch(err => {
      console.log(err);
    });
});

//@route GET /gamestats/game?game_id=${game_id}
//@desc gets game id
//@access public
router.get("/game", (req, res) => {
  Game.findOne({
    where: {
      game_id: { [Op.like]: req.query.game_id }
    }
  })
    .then(game => {
      if (game) {
        res.status(200).json({ game });
      }
    })
    .catch(err => {
      res.status(400).json({ err });
    });
});

module.exports = router;
