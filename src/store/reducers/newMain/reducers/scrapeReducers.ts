import { MainCaseReducer } from "../types";

export const scrapeDictionaryReducer: MainCaseReducer<{
  _id: string;
  result: string;
}> = (state, { payload }) => {
  const card = state.cards[payload._id];
  if (card) {
    card.definition += payload.result;
  }
};

export const setScrapeLoading: MainCaseReducer<{
  _id: string;
  value: boolean;
}> = (state, { payload }) => {
  const card = state.cards[payload._id];
  if (card) {
    card.scrape.loading = payload.value;
  }
};
