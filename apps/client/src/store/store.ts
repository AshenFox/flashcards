import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import rootReducer from "./reducers/index";
import { AppActions } from "./types";

const initialState = {};

const isDev = process.env.NODE_ENV === "development";

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  devTools: isDev,
});

export default store;

export type AppState = ReturnType<typeof rootReducer>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch &
  ThunkDispatch<RootState, null, AppActions>;
// Customized dispatch and selector hooks for the Tuner App
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type ThunkActionApp = ThunkAction<void, RootState, unknown, AppActions>;
