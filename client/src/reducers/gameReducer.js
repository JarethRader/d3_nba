import {
  GAMESTATS_LOADING,
  GET_GAME_FAIL,
  GET_GAME_SUCCESS,
  GET_GAME_OF_DATE_FAIL,
  GET_GAME_OF_DATE_SUCCESS,
  LOAD_NEW_DATE_FAIL,
  LOAD_NEW_DATE_SUCCESS,
  SET_SELECTED_DATE
} from "../actions/types";

const intitialState = {
  gameDate: null,
  game: {},
  gamesOfDate: [],
  gamestatsLoading: false
};

export default function(state = intitialState, action) {
  switch (action.type) {
    case SET_SELECTED_DATE:
      console.log("Reducer");
      return {
        ...state,
        gameDate: action.payload,
        gamestatsLoading: false
      };
    case GET_GAME_SUCCESS:
      return {
        game: action.payload,
        gamestatsLoading: false
      };
    case GET_GAME_FAIL:
      return {
        ...state,
        game: {},
        gamestatsLoading: false
      };
    case GET_GAME_OF_DATE_SUCCESS:
      return {
        gamesOfDate: action.payload,
        gamestatsLoading: false
      };
    case GET_GAME_OF_DATE_FAIL:
      return {
        gamesOfDate: [],
        gamestatsLoading: false
      };
    case LOAD_NEW_DATE_FAIL:
    case LOAD_NEW_DATE_SUCCESS:
      return {
        ...state,
        gamestatsLoading: false
      };
    case GAMESTATS_LOADING:
      return {
        ...state,
        gamestatsLoading: true
      };
    default: {
      return state;
    }
  }
}
