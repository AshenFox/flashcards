import { createSlice } from "@reduxjs/toolkit";

import dimenInitState from "./initState";
import * as reducers from "./reducers";

const dimenSlice = createSlice({
  name: "dimen",
  initialState: dimenInitState,
  reducers,
});

export const dimenActions = dimenSlice.actions;

type InferActions<T> =
  T extends Record<string, (...args: any[]) => infer R> ? R : never;

export type DimenActions = InferActions<typeof dimenActions>;

export default dimenSlice.reducer;
