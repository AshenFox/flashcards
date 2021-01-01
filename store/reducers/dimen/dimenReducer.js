import {
  SET_HEADER_DIMEN,
  SET_SCROLL_HEIGHT,
  SET_GAME_CONTROLS_DIMEN,
} from '../../actions/types';
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

    default:
      return state;
  }
};

export default DimenReducer;
