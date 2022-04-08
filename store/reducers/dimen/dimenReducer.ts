import {
  SET_HEADER_DIMEN,
  SET_SCROLL_HEIGHT,
  SET_SCROLL_WIDTH,
  SET_GAME_CONTROLS_DIMEN,
  SET_IS_SCROLL,
} from '../../types/types';
import initialState from './dimenInitState';

const DimenReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_HEADER_DIMEN:
      return {
        ...state,
        ...payload,
      };

    case SET_GAME_CONTROLS_DIMEN:
      return {
        ...state,
        ...payload,
      };

    case SET_SCROLL_HEIGHT:
      return {
        ...state,
        scroll_height: payload.scroll_height,
      };

    case SET_SCROLL_WIDTH:
      return {
        ...state,
        scroll_width: payload.scroll_width,
      };

    case SET_IS_SCROLL:
      return {
        ...state,
        is_scroll: payload.is_scroll,
      };

    default:
      return state;
  }
};

export default DimenReducer;
