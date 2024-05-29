import {
  CONTROL_CARD,
  CONTROL_MODULE,
  CREATE_CARD,
  DELETE_CARD,
  SET_CARD_EDIT,
  SET_CARD_IMGURL,
  SET_CARD_QUESTION,
  SET_CARD_SAVE,
  SET_CARDS_SAVE,
  SET_CARDS_SAVE_POSITIVE,
  SET_MODULE_LOADING,
  SET_MODULE_QUESTION,
} from "../../../types";
import { MainActions } from "../../../types";
import initialState from "../mainInitState";
import { MainState } from "./../mainInitState";

const subEditReducer = (
  state = initialState,
  action: MainActions,
): MainState | false => {
  const { payload, type } = action;

  switch (type) {
    case SET_CARD_EDIT:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: {
            ...state.cards[payload._id],
            edit: payload.value,
          },
        },
      };

    case CONTROL_CARD:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: {
            ...state.cards[payload._id],
            [payload.type]: payload.value,
          },
        },
      };

    case SET_CARD_IMGURL:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: {
            ...state.cards[payload._id],
            imgurl: payload.imgurl,
          },
        },
      };

    case CONTROL_MODULE:
      return {
        ...state,
        module: state.module
          ? {
              ...state.module,
              title: payload.value,
            }
          : state.module,
      };

    case DELETE_CARD:
      return {
        ...state,
        cards: Object.fromEntries(
          Object.entries(state.cards).filter(([_id]) => _id !== payload._id),
        ),
      };

    case CREATE_CARD:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: payload,
        },
      };

    case SET_CARD_SAVE:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: {
            ...state.cards[payload._id],
            save: payload.value,
          },
        },
      };

    case SET_CARDS_SAVE:
      return {
        ...state,
        cards: Object.fromEntries(
          Object.entries(state.cards).map(([_id, card]) => [
            _id,
            { ...card, save: payload.value },
          ]),
        ),
      };

    case SET_CARDS_SAVE_POSITIVE:
      return {
        ...state,
        cards: Object.fromEntries(
          Object.entries(state.cards).map(([_id, card]) => {
            if (payload._id_arr.includes(_id)) {
              return [_id, { ...card, save: true }];
            } else {
              return [_id, card];
            }
          }),
        ),
      };

    case SET_MODULE_QUESTION:
      return {
        ...state,
        module: state.module
          ? {
              ...state.module,
              question: payload.value,
            }
          : state.module,
      };

    case SET_CARD_QUESTION:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: {
            ...state.cards[payload._id],
            question: payload.value,
          },
        },
      };

    case SET_MODULE_LOADING:
      return {
        ...state,
        module: state.module
          ? {
              ...state.module,
              module_loading: payload.value,
            }
          : state.module,
      };

    default:
      return false;
  }
};

export default subEditReducer;
