import {
  SET_FLASHCARDS_PROGRESS,
  RESET_FLASHCARDS_PROGRESS,
  SHUFFLE_FLASHCARDS,
  SORT_FLASHCARDS,
  SET_FLASHCARDS_SHUFFLED,
  SET_FLASHCARDS_SIDE,
  SAVE_FLASHCARDS_ANSWER,
  PREPARE_WRITE,
  SET_WRITE_IS_INIT,
  SET_WRITE_ANSWER_FIELD,
  SET_WRITE_COPY_ANSWER_FIELD,
  CHECK_WRITE_ANSWER,
  NEXT_WRITE_CARD,
  OVERRIDE_WRITE_ANSWER,
  NEXT_WRITE_ROUND,
  RESET_ALL_GAME_FIELDS,
} from './types';
import { card_fields } from '../reducers/game/gameInitState';

// SAVE_FLASHCARDS_ANSWER
export const save_flashcards_answer = (id, card_answer) => ({
  type: SAVE_FLASHCARDS_ANSWER,
  payload: {
    id,
    card_answer,
  },
});

// SET_WRITE_IS_INIT
export const set_write_is_init = (value) => ({
  type: SET_WRITE_IS_INIT,
  payload: {
    value,
  },
});

// PREPARE_WRITE
export const reset_all_game_fields = () => ({
  type: RESET_ALL_GAME_FIELDS,
});

// PREPARE_WRITE
export const prepare_write = () => async (dispatch, getState) => {
  const {
    main: { cards },
  } = getState();
  dispatch(set_write_is_init(false));

  const remaining = Object.values(cards).map(({ _id, stage }) => ({
    id: _id,
    stage,
    ...card_fields,
  }));

  dispatch({
    type: RESET_ALL_GAME_FIELDS,
  });

  dispatch({
    type: PREPARE_WRITE,
    payload: {
      remaining,
    },
  });

  dispatch(set_write_is_init(true));
};

// SET_WRITE_ANSWER_FIELD
export const set_write_answer_field = (value) => ({
  type: SET_WRITE_ANSWER_FIELD,
  payload: {
    value,
  },
});

// SET_WRITE_COPY_ANSWER_FIELD
export const set_write_copy_answer_field = (value) => ({
  type: SET_WRITE_COPY_ANSWER_FIELD,
  payload: {
    value,
  },
});

// CHECK_WRITE_ANSWER
export const check_write_answer = (not_know) => async (dispatch, getState) => {
  const {
    game: {
      write: { remaining, answer },
    },
    main: { cards },
  } = getState();
  const id = remaining[remaining.length - 1].id;
  const card = cards[id];

  const formatedTerm = card.term.replace(/&nbsp;/g, ' ').trim();

  dispatch({
    type: CHECK_WRITE_ANSWER,
    payload: {
      card_answer: answer === formatedTerm && !not_know ? 'correct' : 'incorrect',
      answer: not_know ? '' : answer,
    },
  });
};

// NEXT_WRITE_CARD
export const next_write_card = () => ({
  type: NEXT_WRITE_CARD,
});

// OVERRIDE_WRITE_ANSWER
export const override_write_answer = () => ({
  type: OVERRIDE_WRITE_ANSWER,
});

// NEXT_WRITE_ROUND
export const next_write_round = () => ({
  type: NEXT_WRITE_ROUND,
});

// SET_FLASHCARDS_PROGRESS
export const set_flashcards_progress = (value) => async (dispatch, getState) => {
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
export const reset_flashcards_progress = () => async (dispatch, getState) => {
  dispatch({
    type: SET_FLASHCARDS_SIDE,
    payload: {
      value: 'definition',
    },
  });

  dispatch({
    type: RESET_FLASHCARDS_PROGRESS,
  });
};

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
