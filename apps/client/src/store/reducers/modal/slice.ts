import { createSlice } from "@reduxjs/toolkit";

import modalInitState from "./initState";
import * as reducers from "./reducers";
import * as thunks from "./thunks";

const modalSlice = createSlice({
  name: "modal",
  initialState: modalInitState,
  reducers,
});

export const modalActions = modalSlice.actions;
export const modalThunks = thunks;

type InferActions<T> =
  T extends Record<string, (...args: any[]) => infer R> ? R : never;

export type ModalActions = InferActions<typeof modalActions>;

export default modalSlice.reducer;
