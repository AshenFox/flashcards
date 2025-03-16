import { DimenCaseReducer } from "./types";

export const setDropdown: DimenCaseReducer<{ value: boolean }> = (
  state,
  action,
) => {
  state.dropdown_active = action.payload.value;
};
