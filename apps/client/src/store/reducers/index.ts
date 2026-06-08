import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth/slice";
import modalReducer from "./modal/slice";

export default combineReducers({
  modal: modalReducer,
  auth: authReducer,
});
