const Sequelize = require("sequelize");
const db = require("../config/database");

const BoxScore = db.define("boxscore", {
  game_id: {
    type: Sequelize.INTEGER
  },
  gameDate: {
    type: Sequelize.STRING
  },
  awayTeam: {
    type: Sequelize.STRING
  },
  awayTeamAbr: {
    type: Sequelize.STRING
  },
  homeTeam: {
    type: Sequelize.STRING
  },
  homeTeamAbr: {
    type: Sequelize.STRING
  },
  lastMeetingWinner: {
    type: Sequelize.STRING
  },
  q1AwayPts: {
    type: Sequelize.INTEGER
  },
  q2AwayPts: {
    type: Sequelize.INTEGER
  },
  q3AwayPts: {
    type: Sequelize.INTEGER
  },
  q4AwayPts: {
    type: Sequelize.INTEGER
  },
  q1HomePts: {
    type: Sequelize.INTEGER
  },
  q2HomePts: {
    type: Sequelize.INTEGER
  },
  q3HomePts: {
    type: Sequelize.INTEGER
  },
  q4HomePts: {
    type: Sequelize.INTEGER
  },
  referee1: {
    type: Sequelize.STRING
  },
  referee2: {
    type: Sequelize.STRING
  },
  referee3: {
    type: Sequelize.STRING
  },
  timesTied: {
    type: Sequelize.INTEGER
  },
  leadChanges: {
    type: Sequelize.INTEGER
  },
  winner: {
    type: Sequelize.STRING
  }
});

module.exports = BoxScore;
