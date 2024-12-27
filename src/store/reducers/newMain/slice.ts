import { createSlice } from "@reduxjs/toolkit";

import mainInitState from "./initState";
import * as editReducers from "./reducers/editReducers";
import * as flashcardsReducers from "./reducers/flashcardsReducers";
import * as mainReducers from "./reducers/mainReducers";

const mainSlice = createSlice({
  name: "main",
  initialState: mainInitState,
  reducers: {
    ...mainReducers,
    ...editReducers,
    ...flashcardsReducers,
  },
});

export const actions = mainSlice.actions;

export default mainSlice.reducer;
