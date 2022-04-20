import { AppActions } from './../types/types';
import {
  SET_HEADER_DIMEN,
  SET_SCROLL_HEIGHT,
  SET_GAME_CONTROLS_DIMEN,
  SET_IS_SCROLL,
  SET_SCROLL_WIDTH,
} from '../types/types';

// SET_HEADER_DIMEN
export const set_header_dimen = (el: HTMLElement): AppActions => ({
  type: SET_HEADER_DIMEN,
  payload: {
    header_height: el.offsetHeight,
    header_width: el.offsetWidth,
  },
});

// SET_GAME_CONTROLS_DIMEN
export const set_game_controls_dimen = (el: HTMLDivElement): AppActions => {
  // console.log(el);
  return {
    type: SET_GAME_CONTROLS_DIMEN,
    payload: {
      game_controls_height: el.offsetHeight,
      game_controls_width: el.offsetWidth,
    },
  };
};

// SET_SCROLL_HEIGHT
export const set_scroll_height = (value: number): AppActions => ({
  type: SET_SCROLL_HEIGHT,
  payload: {
    scroll_height: value,
  },
});

// SET_SCROLL_WIDTH
export const set_scroll_width = (value: number): AppActions => ({
  type: SET_SCROLL_WIDTH,
  payload: {
    scroll_width: value,
  },
});

// SET_IS_SCROLL
export const set_is_scroll = (value: boolean): AppActions => ({
  type: SET_IS_SCROLL,
  payload: {
    is_scroll: value,
  },
});
