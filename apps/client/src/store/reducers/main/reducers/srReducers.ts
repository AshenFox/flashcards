import { CardDto } from "@flashcards/common";
import { shuffle } from "@utils/shuffle";

import { transformCards } from "../helpers";
import { MainCaseReducer } from "../types";

export const setCardSRAnswer: MainCaseReducer<{
  _id: string;
  stage: number;
  nextRep: string;
  prevStage: string;
  lastRep: string;
  studyRegime: boolean;
}> = (state, { payload }) => {
  const card = state.cards[payload._id];
  if (card) {
    card.stage = payload.stage;
    card.nextRep = payload.nextRep;
    card.prevStage = payload.prevStage;
    card.lastRep = payload.lastRep;
    card.studyRegime = payload.studyRegime;
  }
};

export const setSRCards: MainCaseReducer<{
  cards: CardDto[];
}> = (state, { payload }) => {
  const cards = transformCards(payload.cards);
  const shuffledCards = shuffle(Object.entries(cards)).sort(
    (a, b) => a[1].stage - b[1].stage,
  );
  state.cards = Object.fromEntries(shuffledCards);
};
