import { CardDto } from "@flashcards/common";

import { card_fields } from "../initState";
import { MainCaseReducer } from "../types";

export const setCardEdit: MainCaseReducer<{ _id: string; value: boolean }> = (
  state,
  { payload },
) => {
  if (state.cards[payload._id]) {
    state.cards[payload._id].edit = payload.value;
  }
};

export const controlCard: MainCaseReducer<{
  _id: string;
  type: "term" | "definition";
  value: string;
}> = (state, { payload }) => {
  state.cards[payload._id][payload.type] = payload.value;
};

export const setCardImgurl: MainCaseReducer<{ _id: string; value: string }> = (
  state,
  { payload },
) => {
  state.cards[payload._id].imgurl = payload.value;
};

export const controlModule: MainCaseReducer<{ value: string }> = (
  state,
  { payload },
) => {
  if (state.module) {
    state.module.title = payload.value;
  }
};

export const deleteCardReducer: MainCaseReducer<{ cards: CardDto[] }> = (
  state,
  { payload },
) => {
  const updatedCards = Object.fromEntries(
    payload.cards.map(card => {
      const prevCard = state.cards[card._id];

      return [
        card._id,
        {
          ...prevCard,
          ...card,
        },
      ];
    }),
  );
  state.cards = updatedCards;
};

export const createCardReducer: MainCaseReducer<{ cards: CardDto[] }> = (
  state,
  { payload },
) => {
  const updatedCards = Object.fromEntries(
    payload.cards.map(card => {
      const prevCard = state.cards[card._id];

      return [
        card._id,
        prevCard
          ? {
              ...prevCard,
              ...card,
            }
          : { ...card, ...card_fields },
      ];
    }),
  );
  state.cards = updatedCards;
};

export const setCardSave: MainCaseReducer<{ _id: string; value: boolean }> = (
  state,
  { payload },
) => {
  state.cards[payload._id].save = payload.value;
};

export const setCardsSave: MainCaseReducer<{ value: boolean }> = (
  state,
  { payload },
) => {
  Object.values(state.cards).forEach(card => {
    card.save = payload.value;
  });
};

export const setCardsSavePositiveReducer: MainCaseReducer<{
  _id_arr: string[];
}> = (state, { payload }) => {
  payload._id_arr.forEach(_id => {
    if (state.cards[_id]) {
      state.cards[_id].save = true;
    }
  });
};

export const setModuleQuestion: MainCaseReducer<{ value: boolean }> = (
  state,
  { payload },
) => {
  if (state.module) {
    state.module.question = payload.value;
  }
};

export const setCardQuestion: MainCaseReducer<{
  _id: string;
  value: boolean;
}> = (state, { payload }) => {
  if (state.cards[payload._id]) {
    state.cards[payload._id].question = payload.value;
  }
};

export const setModuleLoading: MainCaseReducer<{ value: boolean }> = (
  state,
  { payload },
) => {
  if (state.module) {
    state.module.module_loading = payload.value;
  }
};
