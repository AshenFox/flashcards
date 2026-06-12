import { withActionName } from "@zustand/helpers";
import type { Slice } from "@zustand/types";

import { RowHeightsStore } from "./types";

export const rowHeightsSlice: Slice<RowHeightsStore> = setAction => {
  const set = withActionName<RowHeightsStore>(setAction);

  return {
    namespaces: {},
    mergeRowHeights: (namespaceKey, updates) => {
      if (Object.keys(updates).length === 0) return;
      set(state => {
        const prev = state.namespaces[namespaceKey] ?? {};
        const heights = { ...prev };
        for (const [id, v] of Object.entries(updates)) {
          if (typeof v === "number" && v > 0 && Number.isFinite(v)) {
            heights[id] = Math.round(v);
          }
        }
        state.namespaces[namespaceKey] = heights;
      }, "mergeRowHeights");
    },
  };
};
