import { CaseReducer } from "@reduxjs/toolkit";
import { Action } from "@store/types";

export type HeaderState = {
  dropdown_active: boolean;
};

export type DimenCaseReducer<P = undefined> = CaseReducer<
  HeaderState,
  Action<P>
>;
