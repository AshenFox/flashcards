import { createSlice } from "@reduxjs/toolkit";

import srInitState from "./initState";
import * as reducers from "./reducers";
import * as thunks from "./thunks";

const srSlice = createSlice({
  name: "sr",
  initialState: srInitState,
  reducers,
});

export const srActions = srSlice.actions;
export const srThunks = thunks;

type InferActions<T> =
  T extends Record<string, (...args: any[]) => infer R> ? R : never;

export type SrActions = InferActions<typeof srActions>;

export default srSlice.reducer;
