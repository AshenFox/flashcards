
import { queryClient } from "@api/queryClient";
import type { CardDto,GetMainCardsResponseDto } from "@flashcards/common";
import { withProduce } from "@zustand/helpers";
import { useCallback } from "react";

import { useCardsQueryKey } from "./context";
import {
  useDeleteCardMutation,
  useDropCardSRMutation,
  useEditCardMutation,
  useScrapeDictionaryMutation,
  useSetCardSRMutation,
} from "./mutations";
import { MainCardsCache } from "./types";

// ---------------------------------------------------------------------------
// Helpers for hooks that need card data from query cache
// ---------------------------------------------------------------------------

export const useGetCardData = () => {
  const queryKey = useCardsQueryKey();

  const getCardData = useCallback((_id: string): CardDto | undefined => {
    const data = queryClient.getQueryData<{ pages: GetMainCardsResponseDto[] }>(queryKey);
    if (!data) return undefined;
    for (const page of data.pages) {
      const found = page.entries.find((c) => c._id === _id);
      if (found) return found;
    }
    return undefined;
  }, [queryClient, queryKey]);

  return getCardData;
};

export const useGetCardsData = () => {
  const queryKey = useCardsQueryKey();

  const getCardsCacheData = useCallback((): CardDto[] | undefined => {
    const data = queryClient.getQueryData<{ pages: GetMainCardsResponseDto[] }>(queryKey);
    if (!data) return undefined;
    return data.pages.flatMap((p) => p.entries);
  }, [queryClient, queryKey]);

  return getCardsCacheData;
};

// ---------------------------------------------------------------------------
// Standalone action hooks (use within CardsUIProvider)
// ---------------------------------------------------------------------------

export const useEditCard = () => {
  const editCardMut = useEditCardMutation();
  const getCardData = useGetCardData();

  return useCallback((_id: string) => {
    const data = getCardData(_id);

    if (!data) return;

    editCardMut.mutate({
      _id: data._id,
      moduleID: data.moduleID,
      term: data.term,
      definition: data.definition,
      imgurl: data.imgurl,
    });
  }, [editCardMut, getCardData]);
};

export const useDeleteCard = () => {
  const deleteCardMut = useDeleteCardMutation();

  return useCallback((_id: string) => deleteCardMut.mutate(_id), [deleteCardMut]);
};

export const useDropCardSR = () => {
  const dropCardSRMut = useDropCardSRMutation();

  return useCallback((_id: string) => dropCardSRMut.mutate(_id), [dropCardSRMut]);
};

export const useSetCardSR = () => {
  const setCardSRMut = useSetCardSRMutation();

  return useCallback((_id: string, value: boolean) => {
    setCardSRMut.mutate({ _id_arr: [_id], value });
  }, [setCardSRMut]);
};

export const useSetCardsSRPositive = () => {
  const getCardsData = useGetCardsData();
  const setCardSRMut = useSetCardSRMutation();

  return useCallback((_id: string) => {
    const cardsData = getCardsData();
    if (!cardsData) return;

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
  }, [setCardSRMut, getCardsData]);
};

export const useScrapeDictionary = (_id: string) => {
  const scrapeDictMut = useScrapeDictionaryMutation(_id);
  const editCardMut = useEditCardMutation();

  const queryKey = useCardsQueryKey();

  const getCardData = useGetCardData();

  const scrape = useCallback((value: "cod" | "urban") => {
    const data = getCardData(_id);
    if (!data) return;

    scrapeDictMut.mutate(
      { term: data.term, value },
      {
        onSuccess: (result) => {
          const dto = getCardData(_id);
          if (!dto) return;
          const newDef = dto.definition + result;

          queryClient.setQueryData(
            queryKey,
            withProduce<MainCardsCache>((draft) => {
              for (const page of draft.pages) {
                const entry = page.entries.find((c) => c._id === _id);
                if (entry) {
                  entry.definition = newDef;
                  break;
                }
              }
            }),
          );

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
  }, [_id, scrapeDictMut, editCardMut, getCardData, queryClient, queryKey]);

  return {
    scrape,
    isPending: scrapeDictMut.isPending,
  };
};

export const useControlCard = () => {
  const queryKey = useCardsQueryKey();

  return useCallback((payload: { _id: string; type: "term" | "definition"; value: string }) => {
    queryClient.setQueryData(
      queryKey,
      withProduce<MainCardsCache>((draft) => {
        for (const page of draft.pages) {
          const entry = page.entries.find((c) => c._id === payload._id);
          if (entry) {
            entry[payload.type] = payload.value;
            break;
          }
        }
      }),
    );
  }, [queryClient, queryKey]);
};

export const useSetCardImgurl = () => {
  const queryKey = useCardsQueryKey();

  return useCallback((payload: { _id: string; value: string }) => {
    queryClient.setQueryData(
      queryKey,
      withProduce<MainCardsCache>((draft) => {
        for (const page of draft.pages) {
          const entry = page.entries.find((c) => c._id === payload._id);
          if (entry) {
            entry.imgurl = payload.value;
            break;
          }
        }
      }),
    );
  }, [queryClient, queryKey]);
};
