import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth/slice";
import dimenReducer from "./dimen/slice";
import gameReducer from "./game/slice";
import headerReducer from "./header/slice";
import mainReducer from "./main/slice";
import modalReducer from "./modal/slice";
import srReducer from "./sr/slice";
import voiceReducer from "./voice/slice";

export default combineReducers({
  modal: modalReducer,
  auth: authReducer,
  main: mainReducer,
  header: headerReducer,
  dimen: dimenReducer,
  voice: voiceReducer,
  game: gameReducer,
  sr: srReducer,
});
