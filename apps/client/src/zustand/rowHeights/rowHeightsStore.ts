import { withActionName } from "@zustand/helpers";
import type { Slice } from "@zustand/types";

import { NamespaceBlob, RowHeightsStore } from "./types";

/** Max row ids kept per namespace. */
const MAX_IDS_PER_NAMESPACE = 1500;

const emptyBlob = (): NamespaceBlob => ({ order: [], heights: {} });

const trimToCap = (blob: NamespaceBlob): NamespaceBlob => {
  if (blob.order.length <= MAX_IDS_PER_NAMESPACE) return blob;
  const drop = blob.order.length - MAX_IDS_PER_NAMESPACE;
  const removed = new Set(blob.order.slice(0, drop));
  const order = blob.order.slice(drop);
  const heights = { ...blob.heights };
  for (const id of removed) delete heights[id];
  return { order, heights };
};

const touchOrder = (blob: NamespaceBlob, ids: string[]): NamespaceBlob => {
  let order = [...blob.order];
  for (const id of ids) {
    order = order.filter(k => k !== id);
    order.push(id);
  }
  return trimToCap({ order, heights: { ...blob.heights } });
};

export const rowHeightsSlice: Slice<RowHeightsStore> = setAction => {
  const set = withActionName<RowHeightsStore>(setAction);

  return {
    namespaces: {},
    mergeRowHeights: (namespaceKey, updates) => {
      if (Object.keys(updates).length === 0) return;
      set(
        state => {
          const prev = state.namespaces[namespaceKey] ?? emptyBlob();
          const ids = Object.keys(updates);
          const nextOrder = touchOrder(prev, ids);
          const heights = { ...nextOrder.heights };
          for (const id of ids) {
            const v = updates[id];
            if (typeof v === "number" && v > 0 && Number.isFinite(v)) {
              heights[id] = Math.round(v);
            }
          }
          state.namespaces[namespaceKey] = {
            order: nextOrder.order,
            heights,
          };
        },
        "mergeRowHeights",
      );
    },
  };
};


