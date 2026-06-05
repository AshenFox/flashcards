import * as editReducers from "./editReducers";
import * as flashcardsReducers from "./flashcardsReducers";
import * as mainReducers from "./mainReducers";
import * as srReducers from "./srReducers";

const reducers = {
  ...editReducers,
  ...flashcardsReducers,
  ...mainReducers,
  ...srReducers,
};

export default reducers;
