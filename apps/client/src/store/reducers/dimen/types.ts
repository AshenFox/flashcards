import { CaseReducer } from "@reduxjs/toolkit";
import { Action } from "@store/types";

export type DimenState = {
  header_height: number;
  header_width: number;
  app_vertical_offset: number;
  /** When true, home header-pull may apply `transform` on `AppWrapper` (see `useGlobalHeaderPull`). */
  app_vertical_offset_active: boolean;
};

export type DimenCaseReducer<P = undefined> = CaseReducer<
  DimenState,
  Action<P>
>;
