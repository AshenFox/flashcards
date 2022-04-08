import { SCRAPE_DICTIONARY, SET_SCRAPE_LOADING } from '../../../types/types';
import initialState from '../mainInitState';

const subScrapeReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case SCRAPE_DICTIONARY:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: {
            ...state.cards[payload._id],
            defenition: state.cards[payload._id].defenition + payload.result,
          },
        },
      };

    case SET_SCRAPE_LOADING:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: {
            ...state.cards[payload._id],
            scrape: {
              loading: payload.loading,
            },
          },
        },
      };

    default:
      return false;
  }
};

export default subScrapeReducer;
