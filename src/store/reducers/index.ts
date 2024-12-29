import { combineReducers } from "redux";

import authReducer from "./auth/authReducer";
import dimenReducer from "./dimen/dimenReducer";
import gameReducer from "./game/gameReducer";
import headerReducer from "./header/headerReducer";
import modalReducer from "./modal/modalReducer";
import mainReducer from "./newMain/slice";
import srReducer from "./sr/srReducer";
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
