import { createSlice } from "@reduxjs/toolkit";

import gameInitState from "./initState";
import * as reducers from "./reducers";
import * as thunks from "./thunks";

const gameSlice = createSlice({
  name: "game",
  initialState: gameInitState,
  reducers,
});

export const gameActions = gameSlice.actions;
export const gameThunks = thunks;

type InferActions<T> =
  T extends Record<string, (...args: any[]) => infer R> ? R : never;

export type GameActions = InferActions<typeof gameActions>;

export default gameSlice.reducer;
