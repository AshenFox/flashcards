import { createStoreHook } from "@store/helpers";

import { layoutSlice } from "./layoutStore";

export { layoutSlice } from "./layoutStore";
export type { LayoutState, LayoutStore } from "./types";

export const useLayoutStore = createStoreHook({
  storeName: "Layout",
  instanceKey: "layout",
  slice: layoutSlice,
});
