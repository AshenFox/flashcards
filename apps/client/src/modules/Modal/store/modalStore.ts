import { createStoreHook, withActionName } from "@store/helpers";
import type { Slice } from "@store/types";
import { generateId } from "@utils/generateId";

import type { ModalStore } from "./types";

export type { ModalStore } from "./types";

const initialState = {
  modals: [] as ModalStore["modals"],
};

export const modalSlice: Slice<ModalStore> = setAction => {
  const set = withActionName<ModalStore>(setAction);

  return {
    ...initialState,
    open: config => {
      const id = generateId();
      set(state => {
        state.modals.push({ ...config, id, isClosing: false });
      }, "open");
      return id;
    },
    replace: config =>
      set(state => {
        const top = state.modals[state.modals.length - 1];

        if (top && !top.isClosing) {
          top.isClosing = true;
        }

        state.modals.push({
          ...config,
          id: generateId(),
          isClosing: false,
        });
      }, "replace"),
    close: id =>
      set(state => {
        const target = id
          ? state.modals.find(m => m.id === id)
          : state.modals[state.modals.length - 1];
        if (target) target.isClosing = true;
      }, "close"),
    closeAll: () =>
      set(state => {
        state.modals.forEach(m => {
          m.isClosing = true;
        });
      }, "closeAll"),
    _remove: id =>
      set(state => {
        state.modals = state.modals.filter(m => m.id !== id);
      }, "_remove"),
  };
};

export const useModalStore = createStoreHook({
  storeName: "Modal",
  instanceKey: "modal",
  slice: modalSlice,
});
