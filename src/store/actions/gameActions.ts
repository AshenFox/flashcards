import { card_fields } from "../reducers/game/gameInitState";
import {
  CHECK_WRITE_ANSWER,
  NEXT_WRITE_CARD,
  NEXT_WRITE_ROUND,
  OVERRIDE_WRITE_ANSWER,
  PREPARE_WRITE,
  RESET_ALL_GAME_FIELDS,
  RESET_FLASHCARDS_PROGRESS,
  SAVE_FLASHCARDS_ANSWER,
  SET_FLASHCARDS_PROGRESS,
  SET_FLASHCARDS_SHUFFLED,
  SET_FLASHCARDS_SIDE,
  SET_WRITE_ANSWER_FIELD,
  SET_WRITE_COPY_ANSWER_FIELD,
  SET_WRITE_IS_INIT,
  SHUFFLE_FLASHCARDS,
  SORT_FLASHCARDS,
} from "../types";
import { AppActions } from "../types";
import { ThunkActionApp } from "./../store";

// SAVE_FLASHCARDS_ANSWER
export const save_flashcards_answer = (
  id: string,
  card_answer: "correct" | "incorrect",
): AppActions => ({
  type: SAVE_FLASHCARDS_ANSWER,
  payload: {
    id,
    card_answer,
  },
});

// SET_WRITE_IS_INIT
export const set_write_is_init = (value: boolean): AppActions => ({
  type: SET_WRITE_IS_INIT,
  payload: {
    value,
  },
});

// PREPARE_WRITE
export const reset_all_game_fields = (): AppActions => ({
  type: RESET_ALL_GAME_FIELDS,
});

// PREPARE_WRITE
export const prepare_write = () => <ThunkActionApp>(async (
    dispatch,
    getState,
  ) => {
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
  });

// SET_WRITE_ANSWER_FIELD
export const set_write_answer_field = (value: string): AppActions => ({
  type: SET_WRITE_ANSWER_FIELD,
  payload: {
    value,
  },
});

// SET_WRITE_COPY_ANSWER_FIELD
export const set_write_copy_answer_field = (value: string): AppActions => ({
  type: SET_WRITE_COPY_ANSWER_FIELD,
  payload: {
    value,
  },
});

// CHECK_WRITE_ANSWER
export const check_write_answer = (not_know?: boolean) =>
  <ThunkActionApp>(async (dispatch, getState) => {
    const {
      game: {
        write: { remaining, answer },
      },
      main: { cards },
    } = getState();

    const id = remaining[remaining.length - 1].id;
    const card = cards[id];

    const formatedTerm = card.term.replace(/&nbsp;/g, " ").trim();

    const payload: {
      card_answer: "correct" | "incorrect";
      answer: string;
    } = {
      card_answer:
        answer === formatedTerm && !not_know ? "correct" : "incorrect",
      answer: not_know ? "" : answer,
    };

    dispatch({
      type: CHECK_WRITE_ANSWER,
      payload,
    });
  });

// NEXT_WRITE_CARD
export const next_write_card = (): AppActions => ({
  type: NEXT_WRITE_CARD,
});

// OVERRIDE_WRITE_ANSWER
export const override_write_answer = (): AppActions => ({
  type: OVERRIDE_WRITE_ANSWER,
});

// NEXT_WRITE_ROUND
export const next_write_round = (): AppActions => ({
  type: NEXT_WRITE_ROUND,
});

// SET_FLASHCARDS_PROGRESS
export const set_flashcards_progress = (value: "next" | "prev") =>
  <ThunkActionApp>(async (dispatch, getState) => {
    const {
      main: { cards },
      game: {
        flashcards: { progress },
      },
    } = getState();

    if (!value) return;

    const cards_arr = Object.values(cards);
    const payload: {
      value?: number;
    } = {};

    if (value === "next") {
      if (progress >= cards_arr.length) return;
      payload.value = 1;
    }

    if (value === "prev") {
      if (progress <= 0) return;
      payload.value = -1;
    }

    dispatch({
      type: SET_FLASHCARDS_PROGRESS,
      payload,
    });
  });

// SHUFFLE_FLASHCARDS
export const shuffle_flashcards = (): AppActions => ({
  type: SHUFFLE_FLASHCARDS,
});

// SORT_FLASHCARDS
export const sort_flashcards = (): AppActions => ({
  type: SORT_FLASHCARDS,
});

// RESET_FLASHCARDS_PROGRESS
export const reset_flashcards_progress = () => <ThunkActionApp>(async (
    dispatch,
    getState,
  ) => {
    dispatch({
      type: SET_FLASHCARDS_SIDE,
      payload: {
        value: "definition",
      },
    });

    dispatch({
      type: RESET_FLASHCARDS_PROGRESS,
    });
  });

// SET_FLASHCARDS_SHUFFLED
export const set_flashcards_shuffled = (value: boolean): AppActions => ({
  type: SET_FLASHCARDS_SHUFFLED,
  payload: {
    value,
  },
});

// SET_FLASHCARDS_SIDE
export const set_flashcards_side = (
  value: "definition" | "term",
): AppActions => ({
  type: SET_FLASHCARDS_SIDE,
  payload: {
    value,
  },
});
