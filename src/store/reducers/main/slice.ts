import { createSlice } from "@reduxjs/toolkit";
import { InferActions } from "@store/types";

import mainInitState from "./initState";
import reducers from "./reducers";
import thunks from "./thunks";

const mainSlice = createSlice({
  name: "main",
  initialState: mainInitState,
  reducers,
});

export const mainActions = mainSlice.actions;
export const mainThunks = thunks;

export type MainActions = InferActions<typeof mainActions>;

export default mainSlice.reducer;
