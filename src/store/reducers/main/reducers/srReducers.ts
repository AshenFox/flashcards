import { shuffle } from "@store/helper-functions";

import { Cards, MainCaseReducer } from "../types";

export const setCardSR: MainCaseReducer<{
  _id: string;
  value: boolean;
}> = (state, { payload }) => {
  state.cards[payload._id].studyRegime = payload.value;
};

export const setCardsSR: MainCaseReducer<{ value: boolean }> = (
  state,
  { payload },
) => {
  Object.values(state.cards).forEach(card => {
    card.studyRegime = payload.value;
  });
};

export const setCardsSRPositive: MainCaseReducer<{
  _id_arr: string[];
}> = (state, { payload }) => {
  payload._id_arr.forEach(_id => {
    if (state.cards[_id]) {
      state.cards[_id].studyRegime = true;
    }
  });
};

export const dropCardSR: MainCaseReducer<{
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

export const putSRAnswer: MainCaseReducer<{
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

export const dropCardsSR: MainCaseReducer<{
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

export const getSRCards: MainCaseReducer<{
  cards: Cards;
}> = (state, { payload }) => {
  const shuffledCards = shuffle(Object.entries(payload.cards)).sort(
    (a, b) => a[1].stage - b[1].stage,
  );
  state.cards = Object.fromEntries(shuffledCards);
};
