import { combineReducers } from "@reduxjs/toolkit";

import modalReducer from "./modal/slice";

export default combineReducers({
  modal: modalReducer,
});
