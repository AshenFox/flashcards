import { DimenCaseReducer } from "./types";

export const setHeaderDimen: DimenCaseReducer<{ el: HTMLElement }> = (
  state,
  action,
) => {
  Object.assign(state, {
    header_height: action.payload.el.getBoundingClientRect().height,
    header_width: action.payload.el.getBoundingClientRect().width,
  });
};
