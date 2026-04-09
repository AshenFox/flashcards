import { editCreateCard } from "@api/methods/edit/editCreateCard";
import { editCreateModule } from "@api/methods/edit/editCreateModule";
import { editUpdateModule } from "@api/methods/edit/editUpdateModule";
import { editGetDraft } from "@api/methods/main/editGetDraft";
import { mainGetModule } from "@api/methods/main/mainGetModule";
import { mainGetModuleCards } from "@api/methods/main/mainGetModuleCards";
import { queryClient } from "@api/queryClient";
import { CardsCache, CardsCacheHook, cardsUISlice } from "@components/Cards";
import type {
  CardDto,
  GetEditDraftResponseDto,
  GetMainModuleCardsResponseDto,
  GetMainModuleResponseDto,
  ModuleDto,
} from "@flashcards/common";
import { saveLastUpdate } from "@store/helper-functions";
import { useAppSelector } from "@store/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createStoreHook, withProduce } from "@zustand/helpers";
import { produce } from "immer";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef } from "react";

// ---------------------------------------------------------------------------
// Query keys
// ---------------------------------------------------------------------------

export const getEditQueryKey = (routeKey?: string) =>
  ["edit", routeKey ?? "none"] as const;

export const getEditCardsQueryKey = (moduleId: string | undefined) =>
  ["edit", moduleId, "cards", "oldest"] as const;

type EditMetaDto = GetMainModuleResponseDto | GetEditDraftResponseDto;

// ---------------------------------------------------------------------------
// Resolved module id (draft uses meta; saved route uses URL _id)
// ---------------------------------------------------------------------------

export const useEditRouteKey = (): string | undefined => {
  const router = useRouter();
  const { _id } = router.query;
  return typeof _id === "string" ? _id : undefined;
};

export const useEditQuery = () => {
  const routeKey = useEditRouteKey();
  const user = useAppSelector(s => s.auth.user);

  return useQuery({
    queryKey: getEditQueryKey(routeKey),
    queryFn: async (): Promise<EditMetaDto> => {
      if (routeKey === "draft") return editGetDraft();
      return mainGetModule({ _id: routeKey! });
    },
    enabled: !!user && !!routeKey,
    // staleTime: 1000 * 60,
    // refetchOnWindowFocus: false,
  });
};

export const useEditResolvedModuleId = (): string | undefined => {
  const routeKey = useEditRouteKey();
  const metaQuery = useEditQuery();

  if (routeKey === "draft") {
    const mod = metaQuery.data?.module;
    return mod?._id != null ? String(mod._id) : undefined;
  }
  if (routeKey && routeKey !== "draft") return routeKey;
  return undefined;
};

export const useEditCardsQuery = () => {
  const user = useAppSelector(s => s.auth.user);
  const resolvedModuleId = useEditResolvedModuleId();

  return useQuery({
    queryKey: getEditCardsQueryKey(resolvedModuleId),
    queryFn: () =>
      mainGetModuleCards({
        _id: resolvedModuleId!,
        created: "no-order",
      }),
    enabled: !!user && !!resolvedModuleId,
    // staleTime: 1000 * 60,
    // refetchOnWindowFocus: false,
  });
};

export const useEditQueryErrorRedirect = () => {
  const routeKey = useEditRouteKey();
  const metaQuery = useEditQuery();
  const cardsQuery = useEditCardsQuery();

  useEffect(() => {
    if (!routeKey) return;
    if (!metaQuery.isError && !cardsQuery.isError) return;
    window.location.replace("/home/modules");
  }, [routeKey, metaQuery.isError, cardsQuery.isError]);
};

// ---------------------------------------------------------------------------
// Convenience selectors (same cache for all callers on this route)
// ---------------------------------------------------------------------------

export const useEditModule = (): ModuleDto | undefined => {
  const q = useEditQuery();
  return q.data?.module;
};

export const useEditCards = (): CardDto[] => {
  const q = useEditCardsQuery();
  return q.data?.entries ?? [];
};

export const useEditIsLoading = (): boolean => {
  const meta = useEditQuery();
  const cards = useEditCardsQuery();
  return meta.isPending || cards.isPending;
};

// ---------------------------------------------------------------------------
// Cards UI store
// ---------------------------------------------------------------------------

export const useEditCardsUIStore = createStoreHook({
  storeName: "EditCardsUI",
  instanceKey: "edit-cards",
  slice: cardsUISlice,
});

// ---------------------------------------------------------------------------
// Cache adapter
// ---------------------------------------------------------------------------

export const useEditCardsCache: CardsCacheHook = () => {
  const resolvedModuleId = useEditResolvedModuleId();
  const queryKey = useMemo(
    () => getEditCardsQueryKey(resolvedModuleId),
    [resolvedModuleId],
  );

  const cardsCache: CardsCache = useMemo(
    () => ({
      getCard: (_id: string) => {
        const data =
          queryClient.getQueryData<GetMainModuleCardsResponseDto>(queryKey);
        return data?.entries.find(card => card._id === _id);
      },
      getAllCards: () => {
        const data =
          queryClient.getQueryData<GetMainModuleCardsResponseDto>(queryKey);
        return data?.entries ?? [];
      },
      set: (recipe: (entries: CardDto[]) => void) => {
        queryClient.setQueryData(
          queryKey,
          withProduce<GetMainModuleCardsResponseDto>(draft => {
            recipe(draft.entries);
          }),
        );
      },
      invalidate: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    }),
    [queryKey],
  );

  return cardsCache;
};

// ---------------------------------------------------------------------------
// Module title: optimistic cache + debounced persist
// ---------------------------------------------------------------------------

export const useEditModuleTitleControl = () => {
  const routeKey = useEditRouteKey();
  const metaKey = useMemo(() => getEditQueryKey(routeKey), [routeKey]);

  const mutation = useMutation({
    mutationFn: async () => {
      const data = queryClient.getQueryData<EditMetaDto>(metaKey);
      if (!data?.module) return;
      await editUpdateModule(data.module as Record<string, unknown>);
      saveLastUpdate();
    },
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flush = useCallback(() => {
    mutation.mutate();
  }, [mutation]);

  const onTitleChange = useCallback(
    (value: string) => {
      queryClient.setQueryData(
        metaKey,
        withProduce<EditMetaDto>(draft => {
          if (draft?.module) draft.module.title = value;
        }),
      );
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        flush();
      }, 100);
    },
    [metaKey, flush],
  );

  const result = useMemo(
    () => ({
      onTitleChange,
      isTitleSaving: mutation.isPending,
    }),
    [onTitleChange, mutation.isPending],
  );

  return result;
};

// ---------------------------------------------------------------------------
// Create card
// ---------------------------------------------------------------------------

export const useEditCreateCardMutation = () => {
  const routeKey = useEditRouteKey();
  const metaKey = useMemo(() => getEditQueryKey(routeKey), [routeKey]);
  const resolvedModuleId = useEditResolvedModuleId();
  const cardsKey = useMemo(
    () => getEditCardsQueryKey(resolvedModuleId),
    [resolvedModuleId],
  );

  return useMutation({
    mutationFn: async (position: "start" | "end") => {
      const meta = queryClient.getQueryData<EditMetaDto>(metaKey);
      if (!meta?.module) throw new Error("No module loaded");
      return editCreateCard(meta.module as Record<string, unknown>, position);
    },
    onSuccess: (res, position) => {
      saveLastUpdate();
      const prev =
        queryClient.getQueryData<GetMainModuleCardsResponseDto>(cardsKey);
      if (prev) {
        queryClient.setQueryData(
          cardsKey,
          produce(prev, draft => {
            draft.entries = res.cards;
          }),
        );
      } else {
        queryClient.invalidateQueries({ queryKey: cardsKey });
      }
      if (position === "end") {
        const scrollHeight = Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.offsetHeight,
          document.body.clientHeight,
          document.documentElement.clientHeight,
        );
        window.scrollTo({ behavior: "smooth", top: scrollHeight });
      }
    },
  });
};

// ---------------------------------------------------------------------------
// Publish draft (create module)
// ---------------------------------------------------------------------------

export const useEditPublishDraftMutation = () => {
  const resolvedModuleId = useEditResolvedModuleId();
  const cardsKey = useMemo(
    () => getEditCardsQueryKey(resolvedModuleId),
    [resolvedModuleId],
  );

  return useMutation({
    mutationFn: async (payload: { saveAllCards: boolean }) => {
      const data =
        queryClient.getQueryData<GetMainModuleCardsResponseDto>(cardsKey);
      const entries = data?.entries ?? [];
      const getUI = useEditCardsUIStore.getState().get;

      const _id_arr: string[] = [];
      for (const card of entries) {
        if (payload.saveAllCards || getUI(card._id).save) {
          _id_arr.push(card._id);
        }
      }

      await editCreateModule(_id_arr);
      saveLastUpdate();
      window.location.replace("/home/modules");
    },
  });
};
