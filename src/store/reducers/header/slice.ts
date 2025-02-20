import { createSlice } from "@reduxjs/toolkit";

import headerInitState from "./initState";
import * as reducers from "./reducers";

const headerSlice = createSlice({
  name: "header",
  initialState: headerInitState,
  reducers,
});

export const headerActions = headerSlice.actions;

type InferActions<T> =
  T extends Record<string, (...args: any[]) => infer R> ? R : never;

export type HeaderActions = InferActions<typeof headerActions>;

export default headerSlice.reducer;
