import { MainCaseReducer } from "../types";

export const scrapeDictionary: MainCaseReducer<{
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
  loading: boolean;
}> = (state, { payload }) => {
  const card = state.cards[payload._id];
  if (card) {
    card.scrape.loading = payload.loading;
  }
};
