import { defaultCardUI, type CardFields, type CardUIStore } from "./types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useCardUIStore = create<CardUIStore>()(
  immer((set, get) => ({
    cards: {},
    get: (_id: string) => {
      const existing = get().cards[_id];
      if (existing) return existing;
      set((state) => {
        state.cards[_id] = {
          ...defaultCardUI,
          gallery: { ...defaultCardUI.gallery },
        };
      });
      return (
        get().cards[_id] ?? {
          ...defaultCardUI,
          gallery: { ...defaultCardUI.gallery },
        }
      );
    },
    set: (_id: string, updater: (draft: CardFields) => void) => {
      set((state) => {
        if (!state.cards[_id]) {
          state.cards[_id] = {
            ...defaultCardUI,
            gallery: { ...defaultCardUI.gallery },
          };
        }
        updater(state.cards[_id]);
      });
    },
    reset: () => set((state) => {
      state.cards = {};
    }),
  })),
);
