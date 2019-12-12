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

  if (!gamedate.test(/\d{4}-\d{2}-\d{2}/)) {
    throw Error("invalid Date Format");
  } else {
    axios
      .get(`/gamestats/gamesOfDate?gamedate=${gamedate}`)
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: GET_GAME_OF_DATE_SUCCESS,
            payload: res.data
          });
        } else if (res.status === 204) {
          dispatch(getDate());
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

  if (!gameDate.test(/\d{2}[/]\d{2}[/]\d{2}/)) {
    throw Error("Invalid Date Format");
  } else {
    axios
      .get(`/gamestats/fetchDay?gameDate=${gameDate}`)
      .then(res => {
        dispatch({
          type: LOAD_NEW_DATE_SUCCESS,
          payload: res.data
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

  if (!gameID.test(/\d{8}/)) {
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
