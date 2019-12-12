//Root Reducer for Redux, combines all other reducers into our root reducer
import { combineReducers } from "redux";
import gameReducer from "./gameReducer";

export default combineReducers({
  game: gameReducer
});
