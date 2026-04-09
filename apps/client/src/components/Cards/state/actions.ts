import { useCallback } from "react";

import { useCardsCash } from "./context";
import {
  useDeleteCardMutation,
  useDropCardSRMutation,
  useEditCardMutation,
  useScrapeDictionaryMutation,
  useSetCardSRMutation,
} from "./mutations";

// ---------------------------------------------------------------------------
// Standalone action hooks (use within CardsUIProvider)
// ---------------------------------------------------------------------------

export const useEditCard = () => {
  const editCardMut = useEditCardMutation();
  const cardsCache = useCardsCash();

  return useCallback(
    (_id: string) => {
      const data = cardsCache.getCard(_id);

      if (!data) return;

      editCardMut.mutate({
        _id: data._id,
        moduleID: data.moduleID,
        term: data.term,
        definition: data.definition,
        imgurl: data.imgurl,
      });
    },
    [editCardMut, cardsCache],
  );
};

export const useDeleteCard = () => {
  const deleteCardMut = useDeleteCardMutation();

  return useCallback(
    (_id: string) => deleteCardMut.mutate(_id),
    [deleteCardMut],
  );
};

export const useDropCardSR = () => {
  const dropCardSRMut = useDropCardSRMutation();

  return useCallback(
    (_id: string) => dropCardSRMut.mutate(_id),
    [dropCardSRMut],
  );
};

export const useSetCardSR = () => {
  const setCardSRMut = useSetCardSRMutation();

  return useCallback(
    (_id: string, value: boolean) => {
      setCardSRMut.mutate({ _id_arr: [_id], value });
    },
    [setCardSRMut],
  );
};

export const useSetCardsSRPositive = () => {
  const cardsCache = useCardsCash();
  const setCardSRMut = useSetCardSRMutation();

  return useCallback(
    (_id: string) => {
      const cardsData = cardsCache.getAllCards();
      if (!cardsData.length) return;

      const _id_arr: string[] = [];

      for (const card of cardsData) {
        if (card._id === _id) {
          _id_arr.push(card._id);
          break;
        }
        if (card.studyRegime) _id_arr.length = 0;
        else _id_arr.push(card._id);
      }

      setCardSRMut.mutate({ _id_arr, value: true });
    },
    [setCardSRMut, cardsCache],
  );
};

export const useScrapeDictionary = (_id: string) => {
  const scrapeDictMut = useScrapeDictionaryMutation(_id);
  const editCardMut = useEditCardMutation();
  const cardsCache = useCardsCash();

  const scrape = useCallback(
    (value: "cod" | "urban") => {
      const data = cardsCache.getCard(_id);
      if (!data) return;

      scrapeDictMut.mutate(
        { term: data.term, value },
        {
          onSuccess: result => {
            const dto = cardsCache.getCard(_id);
            if (!dto) return;
            const newDef = dto.definition + result;

            cardsCache.set(entries => {
              const entry = entries.find(c => c._id === _id);
              if (entry) entry.definition = newDef;
            });

            editCardMut.mutate({
              _id: dto._id,
              moduleID: dto.moduleID,
              term: dto.term,
              definition: newDef,
              imgurl: dto.imgurl,
            });
          },
        },
      );
    },
    [_id, scrapeDictMut, editCardMut, cardsCache],
  );

  return {
    scrape,
    isPending: scrapeDictMut.isPending,
  };
};

export const useControlCard = () => {
  const cardsCache = useCardsCash();

  return useCallback(
    (payload: { _id: string; type: "term" | "definition"; value: string }) => {
      cardsCache.set(entries => {
        const entry = entries.find(c => c._id === payload._id);
        if (entry) entry[payload.type] = payload.value;
      });
    },
    [cardsCache],
  );
};

export const useSetCardImgurl = () => {
  const cardsCache = useCardsCash();

  return useCallback(
    (payload: { _id: string; value: string }) => {
      cardsCache.set(entries => {
        const entry = entries.find(c => c._id === payload._id);
        if (entry) entry.imgurl = payload.value;
      });
    },
    [cardsCache],
  );
};
