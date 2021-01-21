import { combineReducers } from 'redux';
import modalReducer from './modal/modalReducer';
import authReducer from './auth/authReducer';
import mainReducer from './main/mainReducer';
import headerReducer from './header/headerReducer';
import dimenReducer from './dimen/dimenReducer';
import voiceReducer from './voice/voiceReducer';
import gameReducer from './game/gameReducer';
import srReducer from './sr/srReducer';

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
