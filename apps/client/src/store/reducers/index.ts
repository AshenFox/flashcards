import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth/slice";
import dimenReducer from "./dimen/slice";
import gameReducer from "./game/slice";
import headerReducer from "./header/slice";
import mainReducer from "./main/slice";
import modalReducer from "./modal/slice";

export default combineReducers({
  modal: modalReducer,
  auth: authReducer,
  main: mainReducer,
  header: headerReducer,
  dimen: dimenReducer,
  game: gameReducer,
});
