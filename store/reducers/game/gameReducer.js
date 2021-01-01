import {
  SET_FLASHCARDS_PROGRESS,
  RESET_FLASHCARDS_PROGRESS,
  SET_FLASHCARDS_SHUFFLED,
  SET_FLASHCARDS_SIDE,
} from '../../actions/types';
import initialState from './gameInitState';

const GameReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_FLASHCARDS_PROGRESS:
      return {
        ...state,
        flashcards: {
          ...state.flashcards,
          progress: state.flashcards.progress + payload.value,
        },
      };

    case RESET_FLASHCARDS_PROGRESS:
      return {
        ...state,
        flashcards: {
          ...state.flashcards,
          progress: 0,
        },
      };

    case SET_FLASHCARDS_SHUFFLED:
      return {
        ...state,
        flashcards: {
          ...state.flashcards,
          shuffled: payload.value,
        },
      };

    case SET_FLASHCARDS_SIDE:
      return {
        ...state,
        flashcards: {
          ...state.flashcards,
          side: payload.value,
        },
      };
    default:
      return state;
  }
};

export default GameReducer;
