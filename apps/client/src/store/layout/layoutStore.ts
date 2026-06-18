import { withActionName } from "@store/helpers";

import type { Slice } from "@store/types";
import type { LayoutStore } from "./types";

export type { LayoutStore } from "./types";

const initialState = {
  header_height: 0,
  header_width: 0,
  dropdown_active: false,
};

export const layoutSlice: Slice<LayoutStore> = setAction => {
  const set = withActionName<LayoutStore>(setAction);

  return {
    ...initialState,
    setHeaderDimensions: payload =>
      set(state => {
        state.header_height = payload.height;
        state.header_width = payload.width;
      }, "setHeaderDimensions"),
    setDropdownActive: value =>
      set(state => {
        state.dropdown_active = value;
      }, "setDropdownActive"),
  };
};
