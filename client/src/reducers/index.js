//Root Reducer for Redux, combines all other reducers into our root reducer
import { combineReducers } from "redux";
import itemReducer from "./itemReducer";

export default combineReducers({
  item: itemReducer
});
