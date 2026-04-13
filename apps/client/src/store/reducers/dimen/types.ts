import { CaseReducer } from "@reduxjs/toolkit";
import { Action } from "@store/types";

export type DimenState = {
  header_height: number;
  header_width: number;
  app_vertical_offset: number;
};

export type DimenCaseReducer<P = undefined> = CaseReducer<
  DimenState,
  Action<P>
>;
