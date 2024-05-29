import { shuffle } from "../../../helper-functions";
import { SHUFFLE_FLASHCARDS, SORT_FLASHCARDS } from "../../../types/types";
import initialState from "../mainInitState";
import { MainActions } from "./../../../types/types";
import { MainState } from "./../mainInitState";

const subFlashcardsReducer = (
  state = initialState,
  action: MainActions,
): MainState | false => {
  const { payload, type } = action;

  switch (type) {
    case SHUFFLE_FLASHCARDS:
      return {
        ...state,
        cards: Object.fromEntries(
          shuffle(Object.entries(state.cards)).sort(
            (a, b) => a[1].stage - b[1].stage,
          ),
        ),
      };

    case SORT_FLASHCARDS:
      return {
        ...state,
        cards: Object.fromEntries(
          Object.entries(state.cards).sort(
            ([, a], [, b]) =>
              new Date(a.creation_date).getTime() -
              new Date(b.creation_date).getTime(),
          ),
        ),
      };
    default:
      return false;
  }
};

export default subFlashcardsReducer;
