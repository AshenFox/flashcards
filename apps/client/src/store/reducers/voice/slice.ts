import { createSlice } from "@reduxjs/toolkit";

import voiceInitState from "./initState";
import * as reducers from "./reducers";
import * as thunks from "./thunks";

const voiceSlice = createSlice({
  name: "voice",
  initialState: voiceInitState,
  reducers,
});

export const voiceActions = voiceSlice.actions;
export const voiceThunks = thunks;

type InferActions<T> =
  T extends Record<string, (...args: any[]) => infer R> ? R : never;

export type VoiceActions = InferActions<typeof voiceActions>;

export default voiceSlice.reducer;
