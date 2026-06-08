import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth/slice";
import dimenReducer from "./dimen/slice";
import headerReducer from "./header/slice";
import modalReducer from "./modal/slice";

export default combineReducers({
  modal: modalReducer,
  auth: authReducer,
  header: headerReducer,
  dimen: dimenReducer,
});
