import {
  SET_FLASHCARDS_PROGRESS,
  RESET_FLASHCARDS_PROGRESS,
  SHUFFLE_FLASHCARDS,
  SORT_FLASHCARDS,
  SET_FLASHCARDS_SHUFFLED,
  SET_FLASHCARDS_SIDE,
} from './types';

// SET_FLASHCARDS_PROGRESS
export const set_flashcards_progress = (value) => async (
  dispatch,
  getState
) => {
  const {
    main: { cards },
    game: {
      flashcards: { progress },
    },
  } = getState();
  if (!value) return;

  const cards_arr = Object.values(cards);
  const payload = {};

  if (value === 'next') {
    if (progress >= cards_arr.length) return;
    payload.value = 1;
  }

  if (value === 'prev') {
    if (progress <= 0) return;
    payload.value = -1;
  }

  dispatch({
    type: SET_FLASHCARDS_PROGRESS,
    payload,
  });
};

// SHUFFLE_FLASHCARDS
export const shuffle_flashcards = () => ({
  type: SHUFFLE_FLASHCARDS,
});

// SORT_FLASHCARDS
export const sort_flashcards = () => ({
  type: SORT_FLASHCARDS,
});

// RESET_FLASHCARDS_PROGRESS
export const reset_flashcards_progress = () => ({
  type: RESET_FLASHCARDS_PROGRESS,
});

// SET_FLASHCARDS_SHUFFLED
export const set_flashcards_shuffled = (value) => ({
  type: SET_FLASHCARDS_SHUFFLED,
  payload: {
    value,
  },
});

// SET_FLASHCARDS_SIDE
export const set_flashcards_side = (value) => ({
  type: SET_FLASHCARDS_SIDE,
  payload: {
    value,
  },
});
