import {
  GAMESTATS_LOADING,
  GET_GAME_FAIL,
  GET_GAME_SUCCESS,
  LOAD_NEW_DATE_FAIL,
  LOAD_NEW_DATE_SUCCESS,
  GET_GAME_OF_DATE_SUCCESS,
  GET_GAME_OF_DATE_FAIL,
  SET_SELECTED_DATE
} from "./types";
import axios from "axios";

export const getGamesOfDay = gamedate => dispatch => {
  dispatch(setGamestatsLoading());
  let gameList = [];
  if (!/\d{4}-\d{2}-\d{2}/.test(gamedate)) {
    throw Error("Invalid Date Format");
  } else {
    axios
      .get(`/gamestats/gamesOfDate?gamedate=${gamedate}`)
      .then(res => {
        if (res.status === 200) {
          res.data.boxScoreSummary.forEach(game => {
            let gameInfo = {
              game_id: game.boxScore.game_id,
              awayTeam: game.boxScore.awayTeam,
              awayTeamAbr: game.boxScore.awayTeamAbr,
              homeTeam: game.boxScore.homeTeam,
              homeTeamAbr: game.boxScore.homeTeamAbr
            };
            gameList = [gameInfo, ...gameList];
          });
          dispatch({
            type: GET_GAME_OF_DATE_SUCCESS,
            payload: { gamesOfDate: res.data, gameList: gameList }
          });
        } else if (res.status === 204) {
          dispatch(
            getDate(
              gamedate.substring(5, 7) +
                "/" +
                gamedate.substring(8, 10) +
                "/" +
                gamedate.substring(2, 4)
            )
          );
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: GET_GAME_OF_DATE_FAIL
        });
      });
  }
};

export const getDate = gameDate => dispatch => {
  dispatch(setGamestatsLoading());
  let gameList = [];
  console.log("Game Date: " + gameDate);
  if (!/\d{2}[/]\d{2}[/]\d{2}/.test(gameDate)) {
    throw Error("Invalid Date Format");
  } else {
    axios
      .get(`/gamestats/fetchDay?gamedate=${gameDate}`)
      .then(res => {
        //TODO Add Gameslist here

        res.data.forEach(game => {
          let gameInfo = {
            game_id: game.boxScore.game_id,
            awayTeam: game.boxScore.awayTeam,
            awayTeamAbr: game.boxScore.awayTeamAbr,
            homeTeam: game.boxScore.homeTeam,
            homeTeamAbr: game.boxScore.homeTeamAbr
          };
          gameList = [gameInfo, ...gameList];
        });
        dispatch({
          type: LOAD_NEW_DATE_SUCCESS,
          payload: { gamesOfDate: res.data, gameList: gameList }
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: LOAD_NEW_DATE_FAIL
        });
      });
  }
};

export const getGame = gameID => dispatch => {
  dispatch(setGamestatsLoading());
  console.log(gameID);
  if (!/\d{8}/.test(gameID)) {
    throw Error("Invalid Game ID");
  } else {
    axios
      .get(`/gamestats/game?game_id=${gameID}`)
      .then(res => {
        dispatch({
          type: GET_GAME_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: GET_GAME_FAIL
        });
      });
  }
};

export const setGameDate = selectedGameDate => {
  console.log("Setting game date: " + selectedGameDate);
  return {
    type: SET_SELECTED_DATE,
    payload: selectedGameDate
  };
};

export const setGamestatsLoading = () => {
  return {
    type: GAMESTATS_LOADING
  };
};
