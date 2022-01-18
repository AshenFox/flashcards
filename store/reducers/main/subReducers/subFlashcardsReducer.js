import { SHUFFLE_FLASHCARDS, SORT_FLASHCARDS } from '../../../actions/types';
import initialState from '../mainInitState';
import { shuffle } from '../../helper-fucntions';

const subFlashcardsReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case SHUFFLE_FLASHCARDS:
      return {
        ...state,
        cards: Object.fromEntries(
          shuffle(Object.entries(state.cards)).sort((a, b) => a[1].stage - b[1].stage)
        ),
      };

    case SORT_FLASHCARDS:
      return {
        ...state,
        cards: Object.fromEntries(
          Object.entries(state.cards).sort(
            ([, a], [, b]) => new Date(a.creation_date) - new Date(b.creation_date)
          )
        ),
      };
    default:
      return false;
  }
};

export default subFlashcardsReducer;
