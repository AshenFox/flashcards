import { SHUFFLE_FLASHCARDS, SORT_FLASHCARDS } from '../../../actions/types';
import initialState from '../mainInitState';

const subFlashcardsReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case SHUFFLE_FLASHCARDS:
      return {
        ...state,
        cards: Object.fromEntries(shuffle(Object.entries(state.cards))),
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

// ==============================
// ==============================
// ==============================

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};
