import { UserDto } from "@flashcards/common";

import { AuthCaseReducer } from "./types";

export const authenticateReducer: AuthCaseReducer<UserDto> = (
  state,
  action,
) => {
  state.user = action.payload;
};

export const logOutReducer: AuthCaseReducer = (state, _action) => {
  // No state change by default for log out.
  // Adjust logic as needed.
};

export const changeAuthLoading: AuthCaseReducer<{ value: boolean }> = (
  state,
  action,
) => {
  state.loading = action.payload.value;
};
