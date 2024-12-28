import { combineReducers } from "redux";

import authReducer from "./auth/authReducer";
import dimenReducer from "./dimen/dimenReducer";
import gameReducer from "./game/gameReducer";
import headerReducer from "./header/headerReducer";
import mainReducer from "./main/mainReducer";
import modalReducer from "./modal/modalReducer";
import newMainReducer from "./newMain/slice";
import srReducer from "./sr/srReducer";
import voiceReducer from "./voice/voiceReducer";

export default combineReducers({
  modal: modalReducer,
  auth: authReducer,
  main: mainReducer,
  newMain: newMainReducer, // remove new
  header: headerReducer,
  dimen: dimenReducer,
  voice: voiceReducer,
  game: gameReducer,
  sr: srReducer,
});
