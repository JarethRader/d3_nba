const Sequelize = require("sequelize");
const db = require("../config/database");

const Scoreboard = db.define("scoreboard", {
  GameId: {
    type: Sequelize.STRING
  },
  GameDate: {
    type: Sequelize.STRING
  },
  AwayTeam: {
    type: Sequelize.STRING
  },
  HomeTeam: {
    type: Sequelize.STRING
  },
  LastMeetingWinner: {
    type: Sequelize.STRING
  },
  Q1AwayPts: {
    type: Sequelize.INTEGER
  },
  Q2AwayPts: {
    type: Sequelize.INTEGER
  },
  Q3AwayPts: {
    type: Sequelize.INTEGER
  },
  Q4AwayPts: {
    type: Sequelize.INTEGER
  },
  Q1HomePts: {
    type: Sequelize.INTEGER
  },
  Q2HomePts: {
    type: Sequelize.INTEGER
  },
  Q3HomePts: {
    type: Sequelize.INTEGER
  },
  Q4HomePts: {
    type: Sequelize.INTEGER
  },
  Referee1: {
    type: Sequelize.STRING
  },
  Referee2: {
    type: Sequelize.STRING
  },
  Referee3: {
    type: Sequelize.STRING
  },
  TimesTied: {
    type: Sequelize.INTEGER
  },
  LeadChanges: {
    type: Sequelize.INTEGER
  },
  Winner: {
    type: Sequelize.STRING
  }
});

module.exports = Scoreboard;
