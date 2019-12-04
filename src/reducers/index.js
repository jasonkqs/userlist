import { combineReducers } from "redux";
import data from "./data";
import sort from "./sort";

const reducers = combineReducers({
  data,
  sort
});

export default reducers;
