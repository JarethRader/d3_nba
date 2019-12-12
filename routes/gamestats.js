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
router.get("/fetchDay", async (req, res) => {
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
  BoxScore.findOne({
    where: {
      game_id: { [Op.like]: parseInt(req.query.game_id, 10) }
    }
  })
    .then(boxScoreSummary => {
      if (boxScoreSummary !== null) {
        res.status(200).json({
          boxScoreSummary: {
            game_id: boxScoreSummary.game_id,
            gameDate: boxScoreSummary.gameDate,
            awayTeam: boxScoreSummary.awayTeam,
            awayTeamAbr: boxScoreSummary.awayTeamAbr,
            homeTeam: boxScoreSummary.homeTeam,
            homeTeamAbr: boxScoreSummary.homeTeamAbr,
            lastMeetingWinner: boxScoreSummary.lastMeetingWinner,
            q1AwayPts: boxScoreSummary.q1AwayPts,
            q2AwayPts: boxScoreSummary.q2AwayPts,
            q3AwayPts: boxScoreSummary.q3AwayPts,
            q4AwayPts: boxScoreSummary.q4AwayPts,
            q1HomePts: boxScoreSummary.q1HomePts,
            q2HomePts: boxScoreSummary.q2HomePts,
            q3HomePts: boxScoreSummary.q3HomePts,
            q4HomePts: boxScoreSummary.q4HomePts,
            referee1: boxScoreSummary.referee1,
            referee2: boxScoreSummary.referee2,
            referee3: boxScoreSummary.referee3,
            timesTied: boxScoreSummary.timesTied,
            leadChanges: boxScoreSummary.leadChanges,
            winner: boxScoreSummary.winner
          }
        });
      }
    })
    .catch(err => {
      res.status(400).json({ err });
    });
});

//@route GET /gamestats/getboxScore
//@desc get box stats for specific game in the past
//@access public
router.get("boxScore", async (req, res) => {
  if (!req.query.gameID) {
    return res.status(400).json({ err: "Invalid Game Date" });
  }

  Game.findOne({
    where: {
      game_id: { [Op.like]: parseInt(req.query.gameID, 10) }
    }
  })
    .then(async game => {
      if (game !== null) {
        res.status(400).json({ err: "Game already added" });
      } else {
        await saveNewGame(req.query.gameID)
          .then(async game => {
            await saveNewBoxScore(game.game_id)
              .then(boxScoreSummary => {
                if (boxScoreSummary !== null) {
                  res.status(200).json({
                    boxScoreSummary: {
                      game_id: boxScoreSummary.game_id,
                      gameDate: boxScoreSummary.gameDate,
                      awayTeam: boxScoreSummary.awayTeam,
                      awayTeamAbr: boxScoreSummary.awayTeamAbr,
                      homeTeam: boxScoreSummary.homeTeam,
                      homeTeamAbr: boxScoreSummary.homeTeamAbr,
                      lastMeetingWinner: boxScoreSummary.lastMeetingWinner,
                      q1AwayPts: boxScoreSummary.q1AwayPts,
                      q2AwayPts: boxScoreSummary.q2AwayPts,
                      q3AwayPts: boxScoreSummary.q3AwayPts,
                      q4AwayPts: boxScoreSummary.q4AwayPts,
                      q1HomePts: boxScoreSummary.q1HomePts,
                      q2HomePts: boxScoreSummary.q2HomePts,
                      q3HomePts: boxScoreSummary.q3HomePts,
                      q4HomePts: boxScoreSummary.q4HomePts,
                      referee1: boxScoreSummary.referee1,
                      referee2: boxScoreSummary.referee2,
                      referee3: boxScoreSummary.referee3,
                      timesTied: boxScoreSummary.timesTied,
                      leadChanges: boxScoreSummary.leadChanges,
                      winner: boxScoreSummary.winner
                    }
                  });
                }
              })
              .catch(err => {
                console.log(err);
                res.status(400).json({ err });
              });
          })
          .catch(err => {
            console.log(err);
            res.status(400).json({ err });
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ err });
    });
});

//@route GET /gamestats/gameOfDay
//@desc get all games from a single date
//@access public
router.get("/gamesOfDate", (req, res) => {
  if (!req.query.gamedate) {
    res.status(400).json({ msg: "Invalid Date" });
  }

  let boxScoreSummary = [];

  BoxScore.findAll({
    where: {
      gameDate: { [Op.startsWith]: req.query.gamedate }
    }
  })
    .then(games => {
      if (games[0] === undefined) {
        res.status(204).json({ msg: "No games found for given date" });
      } else {
        games.forEach(game => {
          const {
            game_id,
            gameDate,
            awayTeam,
            awayTeamAbr,
            homeTeam,
            homeTeamAbr,
            lastMeetingWinner,
            q1AwayPts,
            q2AwayPts,
            q3AwayPts,
            q4AwayPts,
            q1HomePts,
            q2HomePts,
            q3HomePts,
            q4HomePts,
            referee1,
            referee2,
            referee3,
            timesTied,
            leadChanges,
            winner
          } = game;
          boxScoreSummary.push({
            boxScore: {
              game_id,
              gameDate,
              awayTeam,
              awayTeamAbr,
              homeTeam,
              homeTeamAbr,
              lastMeetingWinner,
              q1AwayPts,
              q2AwayPts,
              q3AwayPts,
              q4AwayPts,
              q1HomePts,
              q2HomePts,
              q3HomePts,
              q4HomePts,
              referee1,
              referee2,
              referee3,
              timesTied,
              leadChanges,
              winner
            }
          });
        });
        res.status(200).json({ boxScoreSummary });
      }
    })
    .catch(err => {
      res.status(400).json({ err });
    });
});

module.exports = router;
