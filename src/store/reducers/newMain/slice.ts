import { createSlice } from "@reduxjs/toolkit";

import mainInitState from "./initState";
import * as editReducers from "./reducers/editReducers";
import * as flashcardsReducers from "./reducers/flashcardsReducers";
import * as galleryReducers from "./reducers/galleryReducers";
import * as mainReducers from "./reducers/mainReducers";
import * as scrapeReducers from "./reducers/scrapeReducers";
import * as srReducers from "./reducers/srReducers";

const mainSlice = createSlice({
  name: "main",
  initialState: mainInitState,
  reducers: {
    ...mainReducers,
    ...editReducers,
    ...flashcardsReducers,
    ...galleryReducers,
    ...srReducers,
    ...scrapeReducers,
  },
});

export const actions = mainSlice.actions;

type InferActions<T> =
  T extends Record<string, (...args: any[]) => infer R> ? R : never;

export type NewMainActions = InferActions<typeof actions>;

export default mainSlice.reducer;
