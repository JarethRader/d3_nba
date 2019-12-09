const express = require("express");
const router = express.Router();
const Scoreboard = require("../models/Scoreboard");
const Game = require("../models/Game");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const axios = require("axios");
const fs = require("file-system");

const saveNewGame = require("../components/saveNewGame");

//@route GET /gamestats/fetch
router.get("/fetchToday", async (req, res) => {
  console.log(req.query.gamedate);
  const url = `https://stats.nba.com/stats/scoreboardV2?DayOffset=0&LeagueID=00&gameDate=${req.query.gamedate}`;
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  let newGame_ids = [];

  axios.get(url, config).then(async data => {
    let games = data.data["resultSets"][0]["rowSet"];
    for (var i = 0; i < games.length; i++) {
      game_id = games[i][2];
      newGame_ids.push(game_id);
    }
    for (let j = 0; j < newGame_ids.length; j++) {
      //   console.log(newGame_ids[j]);
      try {
        // await saveNewGame(newGame_ids[j])
        //   .then(gameAdded => {
        //     fs.writeFile("./log", gameAdded);
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });
        let statUrl = `https://stats.nba.com/stats/boxscoresummaryv2?GameID=${newGame_ids[j]}`;
        console.log(statUrl.data);
        axios
          .get(statUrl, config)
          .then(stats => {
            console.log("Stats: ");
            console.log(stats);
          })
          .catch(err => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    }

    res.status(200).json({ success: true });
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
