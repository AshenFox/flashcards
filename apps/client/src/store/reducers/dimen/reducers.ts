import { DimenCaseReducer } from "./types";

export const setHeaderDimen: DimenCaseReducer<{
  height: number;
  width: number;
}> = (state, action) => {
  Object.assign(state, {
    header_height: action.payload.height,
    header_width: action.payload.width,
  });
};

export const setAppVerticalOffset: DimenCaseReducer<{
  value: number;
}> = (state, action) => {
  state.app_vertical_offset = action.payload.value;
};
