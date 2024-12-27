import { shuffle } from "@store/helper-functions";

import { MainCaseReducer } from "../types";

export const shuffleFlashcards: MainCaseReducer = state => {
  const shuffledCards = shuffle(Object.entries(state.cards)).sort(
    (a, b) => a[1].stage - b[1].stage,
  );
  state.cards = Object.fromEntries(shuffledCards);
};

export const sortFlashcards: MainCaseReducer = state => {
  const sortedCards = Object.entries(state.cards).sort(
    ([, a], [, b]) =>
      new Date(a.creation_date).getTime() - new Date(b.creation_date).getTime(),
  );
  state.cards = Object.fromEntries(sortedCards);
};
