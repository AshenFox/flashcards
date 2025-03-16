import { createSlice } from "@reduxjs/toolkit";

import authInitState from "./initState";
import * as reducers from "./reducers";
import * as thunks from "./thunks";

const authSlice = createSlice({
  name: "auth",
  initialState: authInitState,
  reducers,
});

export const authActions = authSlice.actions;
export const authThunks = thunks;

type InferActions<T> =
  T extends Record<string, (...args: any[]) => infer R> ? R : never;

export type AuthActions = InferActions<typeof authActions>;

export default authSlice.reducer;
