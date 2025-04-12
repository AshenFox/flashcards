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
