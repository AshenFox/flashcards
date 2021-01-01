import {
  SET_HEADER_DIMEN,
  SET_SCROLL_HEIGHT,
  SET_GAME_CONTROLS_DIMEN,
} from './types';

// SET_HEADER_DIMEN
export const set_header_dimen = (el) => ({
  type: SET_HEADER_DIMEN,
  payload: {
    header_height: el.offsetHeight,
    header_width: el.offsetWidth,
  },
});

// SET_GAME_CONTROLS_DIMEN
export const set_game_controls_dimen = (el) => ({
  type: SET_GAME_CONTROLS_DIMEN,
  payload: {
    game_controls_height: el.offsetHeight,
    game_controls_width: el.offsetWidth,
  },
});

// SET_SCROLL_HEIGHT
export const set_scroll_height = (value) => ({
  type: SET_SCROLL_HEIGHT,
  payload: {
    scroll_height: value,
  },
});
