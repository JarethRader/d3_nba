const BoxScore = require("../models/BoxScore");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const axios = require("axios");

const config = {
  headers: {
    Host: "stats.nba.com",
    Accept: "application/json, text/plain, */*",
    "x-nba-stats-origin": "stats",
    "x-nba-stats-token": "true"
  }
};

const saveNewBoxScore = _gameID => {
  let gameConfig = config;
  gameConfig.headers["Referer"] = `https://stats.nba.com/game/${_gameID}/`;

  let statUrl = `https://stats.nba.com/stats/boxscoresummaryv2?GameID=${_gameID}`;

  return new Promise((resolve, reject) => {
    axios
      .get(statUrl, gameConfig)
      .then(stats => {
        if (gameID === stats.data["resultSets"][0]["rowSet"][0][2]) {
          console.log("Making new box score");

          let _gameID = stats.data["resultSets"][0]["rowSet"][0][2];
          let _gamedate = stats.data["resultSets"][0]["rowSet"][0][0];
          let _awayTeam =
            stats.data["resultSets"][5]["rowSet"][0][5] +
            " " +
            stats.data["resultSets"][5]["rowSet"][0][6];
          let _homeTeam =
            stats.data["resultSets"][5]["rowSet"][1][5] +
            " " +
            stats.data["resultSets"][5]["rowSet"][1][6];
          let _lastMeetingWinner =
            stats.data["resultSets"][6]["rowSet"][0][7] >
            stats.data["resultSets"][6]["rowSet"][0][12]
              ? stats.data["resultSets"][6]["rowSet"][0][6]
              : stats.data["resultSets"][6]["rowSet"][0][11];
          let _q1AwayPts = stats.data["resultSets"][5]["rowSet"][0][8];
          let _q2AwayPts = stats.data["resultSets"][5]["rowSet"][0][9];
          let _q3AwayPts = stats.data["resultSets"][5]["rowSet"][0][10];
          let _q4AwayPts = stats.data["resultSets"][5]["rowSet"][0][11];
          let _q1HomePts = stats.data["resultSets"][5]["rowSet"][1][8];
          let _q2HomePts = stats.data["resultSets"][5]["rowSet"][1][9];
          let _q3HomePts = stats.data["resultSets"][5]["rowSet"][1][10];
          let _q4HomePts = stats.data["resultSets"][5]["rowSet"][1][11];
          let _referee1 =
            stats.data["resultSets"][2]["rowSet"][0][1] +
            " " +
            stats.data["resultSets"][2]["rowSet"][0][2];
          let _referee2 =
            stats.data["resultSets"][2]["rowSet"][1][1] +
            " " +
            stats.data["resultSets"][2]["rowSet"][1][2];
          let _referee3 =
            stats.data["resultSets"][2]["rowSet"][2][1] +
            " " +
            stats.data["resultSets"][2]["rowSet"][2][2];
          let _timesTied = stats.data["resultSets"][1]["rowSet"][0][9];
          let _leadChanges = stats.data["resultSets"][1]["rowSet"][0][8];
          let _winner =
            stats.data["resultSets"][5]["rowSet"][0][22] >
            stats.data["resultSets"][5]["rowSet"][1][22]
              ? stats.data["resultSets"][5]["rowSet"][0][4]
              : stats.data["resultSets"][5]["rowSet"][1][4];

          let newBoxScoreSummary = new BoxScore({
            game_id: _gameID,
            gameDate: _gamedate,
            awayTeam: _awayTeam,
            homeTeam: _homeTeam,
            lastMeetingWinner: _lastMeetingWinner,
            q1AwayPts: _q1AwayPts,
            q2AwayPts: _q2AwayPts,
            q3AwayPts: _q3AwayPts,
            q4AwayPts: _q4AwayPts,
            q1HomePts: _q1HomePts,
            q2HomePts: _q2HomePts,
            q3HomePts: _q3HomePts,
            q4HomePts: _q4HomePts,
            referee1: _referee1,
            referee2: _referee2,
            referee3: _referee3,
            timesTied: _timesTied,
            leadChanges: _leadChanges,
            winner: _winner
          });

          console.log("New Box Score: ");
          console.log(newBoxScoreSummary);

          newBoxScoreSummary
            .save()
            .then(boxScoreSummary => {
              resolve({
                boxScoreSummary: {
                  game_id: boxScoreSummary.Game_id,
                  gameDate: boxScoreSummary.GameDate,
                  awayTeam: boxScoreSummary.AwayTeam,
                  homeTeam: boxScoreSummary.HomeTeam,
                  lastMeetingWinner: boxScoreSummary.LastMeetingWinner,
                  q1AwayPts: boxScoreSummary.Q1AwayPts,
                  q2AwayPts: boxScoreSummary.Q2AwayPts,
                  q3AwayPts: boxScoreSummary.Q3AwayPts,
                  q4AwayPts: boxScoreSummary.Q4AwayPts,
                  q1HomePts: boxScoreSummary.Q1HomePts,
                  q2HomePts: boxScoreSummary.Q2HomePts,
                  q3HomePts: boxScoreSummary.Q3HomePts,
                  q4HomePts: boxScoreSummary.Q4HomePts,
                  referee1: boxScoreSummary.Referee1,
                  referee2: boxScoreSummary.Referee2,
                  referee3: boxScoreSummary.Referee3,
                  timesTied: boxScoreSummary.TimesTied,
                  leadChanges: boxScoreSummary.LeadChanges,
                  winner: boxScoreSummary.Winner
                }
              });
            })
            .catch(err => {
              reject(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
};

module.exports = saveNewBoxScore;
