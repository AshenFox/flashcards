import { createStoreHook } from "@zustand/helpers";

import { srSlice, type SRStore } from "./srStore";

export { srSlice, type SRStore } from "./srStore";

export const useSRStore = createStoreHook({
  storeName: "SR",
  instanceKey: "sr",
  slice: srSlice,
});
