import { useCallback } from "react";

import { useCardsCash, useCardsUIStore } from "./context";

// ---------------------------------------------------------------------------
// Ui state hooks
// ---------------------------------------------------------------------------

export const useSetCardEdit = () => {
  const setCardUI = useCardsUIStore(s => s.set);

  return useCallback(
    (payload: { _id: string; value: boolean }) => {
      setCardUI(payload._id, d => {
        d.edit = payload.value;
      });
    },
    [setCardUI],
  );
};

export const useSetCardSave = () => {
  const setCardUI = useCardsUIStore(s => s.set);

  return useCallback(
    (payload: { _id: string; value: boolean }) => {
      setCardUI(payload._id, d => {
        d.save = payload.value;
      });
    },
    [setCardUI],
  );
};

export const useSetCardsSavePositive = () => {
  const cardsCache = useCardsCash();

  const getCardUI = useCardsUIStore(s => s.get);
  const setCardUI = useCardsUIStore(s => s.set);

  return useCallback(
    (_id: string) => {
      const cardsData = cardsCache.getAllCards();

      if (!cardsData) return;

      const _id_arr: string[] = [];

      for (const card of cardsData) {
        if (card._id === _id) {
          _id_arr.push(card._id);
          break;
        }

        const ui = getCardUI(card._id);

        if (ui?.save) _id_arr.length = 0;
        else _id_arr.push(card._id);
      }
      _id_arr.forEach(id =>
        setCardUI(id, d => {
          d.save = true;
        }),
      );
    },
    [cardsCache, getCardUI, setCardUI],
  );
};
