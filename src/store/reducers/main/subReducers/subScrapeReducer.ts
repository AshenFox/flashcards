import { SCRAPE_DICTIONARY, SET_SCRAPE_LOADING } from "../../../types";
import { MainActions } from "../../../types";
import initialState from "../mainInitState";
import { MainState } from "./../mainInitState";

const subScrapeReducer = (
  state = initialState,
  action: MainActions,
): MainState | false => {
  const { payload, type } = action;

  switch (type) {
    case SCRAPE_DICTIONARY:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: {
            ...state.cards[payload._id],
            definition: state.cards[payload._id].definition + payload.result,
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
