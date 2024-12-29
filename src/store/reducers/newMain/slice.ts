import { createSlice } from "@reduxjs/toolkit";

import mainInitState from "./initState";
import reducers from "./reducers";
import * as thunks from "./thunks/mainThunks";

const mainSlice = createSlice({
  name: "main",
  initialState: mainInitState,
  reducers,
});

export const mainActions = mainSlice.actions;
export const mainThunks = thunks;

type InferActions<T> =
  T extends Record<string, (...args: any[]) => infer R> ? R : never;

export type NewMainActions = InferActions<typeof mainActions>;

export default mainSlice.reducer;
