import { CardDto } from "@flashcards/common/src/api/entities";
import { shuffle } from "@store/helper-functions";

import { transformCards } from "../helpers";
import { MainCaseReducer } from "../types";

export const setCardSRReducer: MainCaseReducer<{
  _id: string;
  value: boolean;
}> = (state, { payload }) => {
  state.cards[payload._id].studyRegime = payload.value;
};

export const setCardsSRReducer: MainCaseReducer<{ value: boolean }> = (
  state,
  { payload },
) => {
  Object.values(state.cards).forEach(card => {
    card.studyRegime = payload.value;
  });
};

export const setCardsSRPositiveReducer: MainCaseReducer<{
  _id_arr: string[];
}> = (state, { payload }) => {
  payload._id_arr.forEach(_id => {
    if (state.cards[_id]) {
      state.cards[_id].studyRegime = true;
    }
  });
};

export const dropCardSRReducer: MainCaseReducer<{
  _id: string;
  stage: number;
  nextRep: string;
  prevStage: string;
  lastRep: string;
}> = (state, { payload }) => {
  const card = state.cards[payload._id];

  if (card) {
    card.stage = payload.stage;
    card.nextRep = payload.nextRep;
    card.prevStage = payload.prevStage;
    card.lastRep = payload.lastRep;
  }
};

export const setCardSRLoading: MainCaseReducer<{
  _id: string;
  value: boolean;
}> = (state, { payload }) => {
  state.cards[payload._id].sr.loading = payload.value;
};

export const putSRAnswerReducer: MainCaseReducer<{
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

export const dropCardsSRReducer: MainCaseReducer<{
  stage: number;
  nextRep: string;
  prevStage: string;
  lastRep: string;
}> = (state, { payload }) => {
  Object.values(state.cards).forEach(card => {
    card.stage = payload.stage;
    card.nextRep = payload.nextRep;
    card.prevStage = payload.prevStage;
    card.lastRep = payload.lastRep;
  });
};

export const getSRCardsReducer: MainCaseReducer<{
  cards: CardDto[];
}> = (state, { payload }) => {
  const cards = transformCards(payload.cards);
  const shuffledCards = shuffle(Object.entries(cards)).sort(
    (a, b) => a[1].stage - b[1].stage,
  );
  state.cards = Object.fromEntries(shuffledCards);
};
