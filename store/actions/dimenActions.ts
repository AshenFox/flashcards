import {
  SET_GAME_CONTROLS_DIMEN,
  SET_HEADER_DIMEN,
  SET_SCROLL_HEIGHT,
} from "../types/types";
import { AppActions } from "./../types/types";

// SET_HEADER_DIMEN
export const set_header_dimen = (el: HTMLElement): AppActions => ({
  type: SET_HEADER_DIMEN,
  payload: {
    header_height: el.offsetHeight,
    header_width: el.offsetWidth,
  },
});

// SET_GAME_CONTROLS_DIMEN
export const set_game_controls_dimen = (el: HTMLDivElement): AppActions => ({
  type: SET_GAME_CONTROLS_DIMEN,
  payload: {
    game_controls_height: el.offsetHeight,
    game_controls_width: el.offsetWidth,
  },
});

// SET_SCROLL_HEIGHT
export const set_scroll_height = (value: number): AppActions => ({
  type: SET_SCROLL_HEIGHT,
  payload: {
    scroll_height: value,
  },
});
