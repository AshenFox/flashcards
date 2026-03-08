
import { Slice } from "@zustand/types";
import { defaultCardUI, type CardFields, type CardsUIStore } from "./types";
import { withActionName } from "@zustand/helpers";

export const cardsUISlice: Slice<CardsUIStore> = (setAction, get) => {
  const set = withActionName<CardsUIStore>(setAction);

  return {
    cards: {},
    get: (_id: string) => ((
      get().cards[_id] ?? {
        ...defaultCardUI,
        gallery: { ...defaultCardUI.gallery },
      }
    )),
    set: (_id: string, updater: (draft: CardFields) => void) => {
      set((state) => {
        if (!state.cards[_id]) {
          state.cards[_id] = {
            ...defaultCardUI,
            gallery: { ...defaultCardUI.gallery },
          };
        }
        updater(state.cards[_id]);
      }, 'setCardUI');
    },
    reset: () => set((state) => {
      state.cards = {};
    }, 'resetCardsUI'),
  };
};
