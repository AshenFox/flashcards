import { SrCaseReducer } from "./types";

export const getSRCountReducer: SrCaseReducer<{
  all_num: number;
  repeat_num: number;
  next_num: number;
  next_date: string;
}> = (state, action) => {
  const { payload } = action;
  state.all_num = payload.all_num;
  state.repeat_num = payload.repeat_num;
  state.next_num = payload.next_num;
  state.next_date = payload.next_date;
  state.counter = payload.repeat_num > 999 ? 999 : payload.repeat_num;
};

export const setSRLoading: SrCaseReducer<{ value: boolean }> = (
  state,
  action,
) => {
  state.loading = action.payload.value;
};

export const setSRCounterReducer: SrCaseReducer<{ value: number }> = (
  state,
  action,
) => {
  state.counter = action.payload.value;
};
