import { SET_DROPDOWN } from "../types";
import { AppActions } from "../types";

// SET_DROPDOWN
export const set_dropdown = (value: boolean): AppActions => ({
  type: SET_DROPDOWN,
  payload: value,
});
