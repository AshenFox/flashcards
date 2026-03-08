
import { editUpdateCard, editDeleteCard } from "@api/methods";
import { srDropCards } from "@api/methods";
import { srSetControl } from "@api/methods";
import { scrapeGetDictionary, scrapeSearchImages } from "@api/methods";
import type { GetMainCardsResponseDto, CardDto } from "@flashcards/common";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import sanitize from "sanitize-html";

import { saveLastUpdate } from "@store/helper-functions";

import { useCardsQueryKey, useCardsUIStore } from "./context";
import { galleryQueryKey } from "./galleryQuery";
import type { GalleryImagesCache } from "./galleryQuery";
import { imgUrlArrToObj, formatDictionaryResult } from "./helpers";

// ---------------------------------------------------------------------------
// Mutation hooks
// ---------------------------------------------------------------------------

export const useEditCardMutation = () => {
  return useMutation({
    mutationFn: (card: Record<string, unknown>) => editUpdateCard(card),
    onSuccess: () => saveLastUpdate(),
  });
};

export const useDeleteCardMutation = ({ queryKey }: { queryKey: QueryKey }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (_id: string) => editDeleteCard(_id),
    onSuccess: () => {
      saveLastUpdate();
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export const useDropCardSRMutation = ({ queryKey }: { queryKey: QueryKey }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (_id: string) => srDropCards([_id]),
    onSuccess: (data, _id) => {
      saveLastUpdate();
      queryClient.setQueryData(queryKey, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: GetMainCardsResponseDto) => ({
            ...page,
            entries: page.entries.map((c: CardDto) =>
              c._id === _id
                ? { ...c, stage: data.stage, nextRep: data.nextRep, prevStage: data.prevStage, lastRep: data.lastRep }
                : c,
            ),
          })),
        };
      });
    },
  });
};

export const useSetCardSRMutation = ({ queryKey }: { queryKey: QueryKey }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ _id_arr, value }: { _id_arr: string[]; value: boolean }) =>
      srSetControl(_id_arr, value),
    onSuccess: (_, { _id_arr, value }) => {
      saveLastUpdate();
      queryClient.setQueryData(queryKey, (old: any) => {
        if (!old) return old;
        const idSet = new Set(_id_arr);
        return {
          ...old,
          pages: old.pages.map((page: GetMainCardsResponseDto) => ({
            ...page,
            entries: page.entries.map((c: CardDto) =>
              idSet.has(c._id) ? { ...c, studyRegime: value } : c,
            ),
          })),
        };
      });
    },
  });
};

export const useScrapeDictionaryMutation = () => {
  return useMutation({
    mutationFn: async ({ term, value }: { term: string; value: "cod" | "urban" }) => {
      if (!term) throw new Error("Term field can not be empty.");
      const termClean = term.replace(/<[^>]*>/g, "");
      const query = value === "cod" ? termClean.replace(/\s+/g, "-") : termClean.replace(/\s+/g, "+");
      const data = await scrapeGetDictionary(value as any, query);
      const result = sanitize(formatDictionaryResult({ type: value, data } as any));
      return result;
    },
    onSuccess: () => saveLastUpdate(),
  });
};

export const useSearchImagesMutation = () => {
  return useMutation({
    mutationFn: async (queryStr: string) => {
      if (!queryStr) throw new Error("Query can not be empty.");
      const regexpURL = /^@url - /;
      const isURL = regexpURL.test(queryStr);

      if (isURL) {
        const url = queryStr.replace(regexpURL, "").trim();
        if (!url) throw new Error("Query can not be empty.");
        return { imgurl_obj: imgUrlArrToObj([{ url }]), all: 1 };
      }

      const data = await scrapeSearchImages(queryStr);
      return { imgurl_obj: imgUrlArrToObj(data), all: data.length };
    },
  });
};

// ---------------------------------------------------------------------------
// Helpers for hooks that need card data from query cache
// ---------------------------------------------------------------------------

function useGetCardData() {
  const queryKey = useCardsQueryKey();
  const queryClient = useQueryClient();

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
}

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
  const queryKey = useCardsQueryKey();
  const deleteCardMut = useDeleteCardMutation({ queryKey });
  return useCallback((_id: string) => deleteCardMut.mutate(_id), [deleteCardMut]);
};

export const useDropCardSR = () => {
  const queryKey = useCardsQueryKey();
  const dropCardSRMut = useDropCardSRMutation({ queryKey });
  return useCallback((_id: string) => dropCardSRMut.mutate(_id), [dropCardSRMut]);
};

export const useSetCardSR = () => {
  const queryKey = useCardsQueryKey();
  const setCardSRMut = useSetCardSRMutation({ queryKey });
  return useCallback((_id: string, value: boolean) => {
    setCardSRMut.mutate({ _id_arr: [_id], value });
  }, [setCardSRMut]);
};

export const useSetCardsSRPositive = () => {
  const queryKey = useCardsQueryKey();
  const queryClient = useQueryClient();
  const setCardSRMut = useSetCardSRMutation({ queryKey });

  return useCallback((_id: string) => {
    const data = queryClient.getQueryData<{ pages: GetMainCardsResponseDto[] }>(queryKey);
    if (!data) return;
    const allCards = data.pages.flatMap((p) => p.entries);
    const _id_arr: string[] = [];
    for (const card of allCards) {
      if (card._id === _id) {
        _id_arr.push(card._id);
        break;
      }
      if (card.studyRegime) _id_arr.length = 0;
      else _id_arr.push(card._id);
    }
    setCardSRMut.mutate({ _id_arr, value: true });
  }, [setCardSRMut, queryClient, queryKey]);
};

export const useScrapeDictionary = () => {
  const scrapeDictMut = useScrapeDictionaryMutation();
  const editCardMut = useEditCardMutation();

  const queryKey = useCardsQueryKey();
  const queryClient = useQueryClient();

  const getCardData = useGetCardData();
  const setCardUI = useCardsUIStore(s => s.set);
  const getCardUI = useCardsUIStore(s => s.get);

  return useCallback((_id: string, value: "cod" | "urban") => {
    const data = getCardData(_id);
    const cardUI = getCardUI(_id);

    if (!data || !cardUI) return;

    setCardUI(_id, (d) => { d.scrape.loading = true; });

    scrapeDictMut.mutate(
      { term: data.term, value },
      {
        onSuccess: (result) => {
          setCardUI(_id, (d) => { d.scrape.loading = false; });
          const dto = getCardData(_id);
          if (!dto) return;
          const newDef = dto.definition + result;
          queryClient.setQueryData(queryKey, (old: any) => {
            if (!old) return old;
            return {
              ...old,
              pages: old.pages.map((page: GetMainCardsResponseDto) => ({
                ...page,
                entries: page.entries.map((c: CardDto) =>
                  c._id === _id ? { ...c, definition: newDef } : c,
                ),
              })),
            };
          });
          editCardMut.mutate({
            _id: dto._id,
            moduleID: dto.moduleID,
            term: dto.term,
            definition: newDef,
            imgurl: dto.imgurl,
          });
        },
        onError: () => {
          setCardUI(_id, (d) => { d.scrape.loading = false; });
        },
      },
    );
  }, [scrapeDictMut, editCardMut, getCardUI, getCardData, queryClient, queryKey]);
};

export const useSearchImages = () => {
  const searchImgMut = useSearchImagesMutation();
  const queryClient = useQueryClient();
  const getCardUI = useCardsUIStore(s => s.get);
  const setCardUI = useCardsUIStore(s => s.set);

  return useCallback((_id: string) => {
    const ui = getCardUI(_id);
    const queryStr = ui.gallery.query;
    setCardUI(_id, (d) => {
      d.gallery.position = 0;
      d.gallery.loading = true;
      d.gallery.error = false;
    });
    searchImgMut.mutate(queryStr, {
      onSuccess: ({ imgurl_obj, all }) => {
        queryClient.setQueryData<GalleryImagesCache>(
          galleryQueryKey(_id, queryStr),
          { imgurl_obj, all },
        );
        setCardUI(_id, (d) => { d.gallery.loading = false; });
      },
      onError: () => {
        setCardUI(_id, (d) => {
          d.gallery.error = true;
          d.gallery.loading = false;
        });
      },
    });
  }, [searchImgMut, queryClient]);
};

export const useSetUrlOk = () => {
  const queryClient = useQueryClient();
  const getCardUI = useCardsUIStore(s => s.get);

  return useCallback((_id: string, index: string, value: boolean) => {
    const queryStr = getCardUI(_id).gallery.query;
    const key = galleryQueryKey(_id, queryStr);
    queryClient.setQueryData<GalleryImagesCache>(key, (old) => {
      if (!old?.imgurl_obj?.[index]) return old;
      return {
        ...old,
        imgurl_obj: {
          ...old.imgurl_obj,
          [index]: { ...old.imgurl_obj[index], ok: value },
        },
      };
    });
  }, [queryClient]);
};

export const useSetCardEdit = () => {
  const setCardUI = useCardsUIStore(s => s.set);

  return useCallback((payload: { _id: string; value: boolean }) => {
    setCardUI(payload._id, (d) => { d.edit = payload.value; });
  }, []);
};

export const useControlCard = () => {
  const queryKey = useCardsQueryKey();
  const queryClient = useQueryClient();

  return useCallback((payload: { _id: string; type: "term" | "definition"; value: string }) => {
    queryClient.setQueryData(queryKey, (old: any) => {
      if (!old) return old;
      return {
        ...old,
        pages: old.pages.map((page: GetMainCardsResponseDto) => ({
          ...page,
          entries: page.entries.map((c: CardDto) =>
            c._id === payload._id ? { ...c, [payload.type]: payload.value } : c,
          ),
        })),
      };
    });
  }, [queryClient, queryKey]);
};

export const useSetCardImgurl = () => {
  const queryKey = useCardsQueryKey();
  const queryClient = useQueryClient();

  return useCallback((payload: { _id: string; value: string }) => {
    queryClient.setQueryData(queryKey, (old: any) => {
      if (!old) return old;
      return {
        ...old,
        pages: old.pages.map((page) => ({
          ...page,
          entries: page.entries.map((c) =>
            c._id === payload._id ? { ...c, imgurl: payload.value } : c,
          ),
        })),
      };
    });
  }, [queryClient, queryKey]);
};

export const useSetCardQuestion = () => {
  const setCardUI = useCardsUIStore(s => s.set);

  return useCallback((payload: { _id: string; value: boolean }) => {
    setCardUI(payload._id, (d) => { d.question = payload.value; });
  }, []);
};

export const useSetCardSave = () => {
  const setCardUI = useCardsUIStore(s => s.set);

  return useCallback((payload: { _id: string; value: boolean }) => {
    setCardUI(payload._id, (d) => { d.save = payload.value; });
  }, []);
};

export const useSetCardsSavePositive = () => {
  const queryKey = useCardsQueryKey();
  const queryClient = useQueryClient();

  const getCardUI = useCardsUIStore(s => s.get);
  const setCardUI = useCardsUIStore(s => s.set);

  return useCallback((_id: string) => {
    const data = queryClient.getQueryData<{ pages: GetMainCardsResponseDto[] }>(queryKey);
    if (!data) return;
    const allCards = data.pages.flatMap((p) => p.entries);
    const _id_arr: string[] = [];

    for (const card of allCards) {
      if (card._id === _id) {
        _id_arr.push(card._id);
        break;
      }
      const ui = getCardUI(card._id);
      if (ui?.save) _id_arr.length = 0;
      else _id_arr.push(card._id);
    }
    _id_arr.forEach((id) => setCardUI(id, (d) => { d.save = true; }));
  }, [queryClient, queryKey]);
};

export const useSetGallerySearch = () => {
  const setCardUI = useCardsUIStore(s => s.set);

  return useCallback((payload: { _id: string; value: boolean }) => {
    setCardUI(payload._id, (d) => { d.gallery.search = payload.value; });
  }, []);
};

export const useControlGalleryQuery = () => {
  const setCardUI = useCardsUIStore(s => s.set);

  return useCallback((payload: { _id: string; value: string }) => {
    setCardUI(payload._id, (d) => { d.gallery.query = payload.value; });
  }, []);
};

export const useResetGalleryFields = () => {
  const setCardUI = useCardsUIStore(s => s.set);

  return useCallback((payload: { _id: string }) => {
    setCardUI(payload._id, (d) => {
      d.gallery.position = 0;
      d.gallery.loading = false;
      d.gallery.error = false;
    });
  }, []);
};

export const useMoveGallery = () => {
  const setCardUI = useCardsUIStore(s => s.set);

  return useCallback((payload: { _id: string; value: "left" | "right" }) => {
    setCardUI(payload._id, (d) => {
      let offset = payload.value === "left" ? 17 : -17;
      d.gallery.position += offset;
    });
  }, []);
};
