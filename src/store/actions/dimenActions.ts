import { SET_HEADER_DIMEN } from "../types";
import { AppActions } from "../types";

// SET_HEADER_DIMEN
export const set_header_dimen = (el: HTMLElement): AppActions => ({
  type: SET_HEADER_DIMEN,
  payload: {
    header_height: el.offsetHeight,
    header_width: el.offsetWidth,
  },
});
