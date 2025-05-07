import { CaseReducer } from "@reduxjs/toolkit";
import { Action } from "@store/types";

export type SrState = {
  all_num?: number;
  repeat_num?: number;
  next_num?: number;
  counter?: number;
  next_date: false | string;
  loading: boolean;
};

export type SrCaseReducer<P = undefined> = CaseReducer<SrState, Action<P>>;
