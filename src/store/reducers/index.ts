import { combineReducers } from "redux";

import authReducer from "./auth/slice";
import dimenReducer from "./dimen/dimenReducer";
import gameReducer from "./game/slice";
import headerReducer from "./header/headerReducer";
import mainReducer from "./main/slice";
import modalReducer from "./modal/slice";
import srReducer from "./sr/slice";
import voiceReducer from "./voice/voiceReducer";

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
