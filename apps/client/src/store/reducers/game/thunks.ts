import { ThunkActionApp } from "@store/store";

import { card_fields } from "./initState";
import { gameActions } from "./slice";

export const prepareWrite = () => <ThunkActionApp>(async (
    dispatch,
    getState,
  ) => {
    const {
      main: { cards },
    } = getState();

    dispatch(gameActions.setWriteIsInit({ value: false }));

    const remaining = Object.values(cards).map(({ _id, stage }) => ({
      id: _id,
      stage,
      ...card_fields,
    }));

    dispatch(gameActions.resetAllGameFields());

    dispatch(gameActions.prepareWriteReducer({ remaining }));

    dispatch(gameActions.setWriteIsInit({ value: true }));
  });

export const checkWriteAnswer = (not_know?: boolean) => <ThunkActionApp>(async (
    dispatch,
    getState,
  ) => {
    const {
      game: {
        write: { remaining, answer },
      },
      main: { cards },
    } = getState();

    const id = remaining[remaining.length - 1].id;
    const card = cards[id];

    const formattedTerm = card.term.replace(/&nbsp;/g, " ").trim();

    const payload: {
      card_answer: "correct" | "incorrect";
      answer: string;
    } = {
      card_answer:
        answer === formattedTerm && !not_know ? "correct" : "incorrect",
      answer: not_know ? "" : answer,
    };

    dispatch(gameActions.checkWriteAnswerReducer(payload));
  });

export const setFlashcardsProgress = (value: "next" | "prev") =>
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
      value: number;
    } = { value: 0 };

    if (value === "next") {
      if (progress >= cards_arr.length) return;
      payload.value = 1;
    }

    if (value === "prev") {
      if (progress <= 0) return;
      payload.value = -1;
    }

    dispatch(gameActions.setFlashcardsProgressReducer(payload));
  });

export const resetFlashcardsProgress = () =>
  <ThunkActionApp>(async dispatch => {
    dispatch(gameActions.setFlashcardsSide({ value: "definition" }));

    dispatch(gameActions.resetFlashcardsProgressReducer());
  });
