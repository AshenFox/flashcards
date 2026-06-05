import { MainCaseReducer } from "../types";

export const setCardEdit: MainCaseReducer<{ _id: string; value: boolean }> = (
  state,
  { payload },
) => {
  if (state.cards[payload._id]) {
    state.cards[payload._id].edit = payload.value;
  }
};
