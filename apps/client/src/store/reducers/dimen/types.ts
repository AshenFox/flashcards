import { CaseReducer } from "@reduxjs/toolkit";
import { Action } from "@store/types";

export type DimenState = {
  header_height: number;
  header_width: number;
  /** Positive px magnitude; global Header applies `margin-top: -value` on /home/cards. */
  global_header_margin_top_px: number;
};

export type DimenCaseReducer<P = undefined> = CaseReducer<
  DimenState,
  Action<P>
>;
