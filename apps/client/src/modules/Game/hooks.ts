import { mainGetModuleCards } from "@api/methods/main/mainGetModuleCards";
import { srGetCards } from "@api/methods/sr/srGetCards";
import { srPutAnswer } from "@api/methods/sr/srPutAnswer";
import { queryClient } from "@api/queryClient";
import { CardsCache, CardsCacheHook, cardsUISlice } from "@components/Cards";
import { useAuthStore } from "@features/auth";
import type {
  CardDto,
  GetMainModuleCardsResponseDto,
} from "@flashcards/common";
import { useGameStore } from "@modules/Game/store/gameStore";
import { createStoreHook, withProduce } from "@store/helpers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { saveLastUpdate } from "@utils/saveLastUpdate";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

// ---------------------------------------------------------------------------
// Query keys
// ---------------------------------------------------------------------------

export const getGameModuleCardsQueryKey = (moduleId: string | undefined) =>
  ["game", "module", moduleId, "cards", "oldest"] as const;

export const getGameSRCardsQueryKey = (number: number | undefined) =>
  ["game", "sr", number, "cards"] as const;

type GameSRCardsData = { entries: CardDto[] };

const getEntries = (
  data: GetMainModuleCardsResponseDto | GameSRCardsData | undefined,
): CardDto[] => {
  if (!data) return [];
  return data.entries;
};

// ---------------------------------------------------------------------------
// Route helpers
// ---------------------------------------------------------------------------

export const useGameRouteParams = () => {
  const router = useRouter();
  const { _id, number } = router.query;

  const isSR = _id === "sr";
  const moduleId = typeof _id === "string" && !isSR ? _id : undefined;
  const srNumber = isSR && typeof number === "string" ? +number : undefined;

  return { isSR, moduleId, srNumber };
};

const useGameActiveQueryKey = () => {
  const { isSR, moduleId, srNumber } = useGameRouteParams();

  return useMemo(() => {
    if (isSR) return getGameSRCardsQueryKey(srNumber);
    return getGameModuleCardsQueryKey(moduleId);
  }, [isSR, moduleId, srNumber]);
};

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

export const useGameModuleCardsQuery = () => {
  const { moduleId } = useGameRouteParams();
  const user = useAuthStore(s => s.user);

  return useQuery({
    queryKey: getGameModuleCardsQueryKey(moduleId),
    queryFn: () => mainGetModuleCards({ _id: moduleId!, created: "oldest" }),
    enabled: !!user && !!moduleId,
  });
};

export const useGameSRCardsQuery = () => {
  const { srNumber, isSR } = useGameRouteParams();
  const user = useAuthStore(s => s.user);

  return useQuery({
    queryKey: getGameSRCardsQueryKey(srNumber),
    queryFn: async () => {
      const { cards } = await srGetCards(srNumber!);

      return { entries: cards } satisfies GameSRCardsData;
    },
    enabled: !!user && isSR && srNumber !== undefined,
  });
};

export const useGameActiveCardsQuery = () => {
  const { isSR } = useGameRouteParams();
  const moduleQuery = useGameModuleCardsQuery();
  const srQuery = useGameSRCardsQuery();

  return isSR ? srQuery : moduleQuery;
};

// ---------------------------------------------------------------------------
// Cards UI store
// ---------------------------------------------------------------------------

export const useGameCardsUIStore = createStoreHook({
  storeName: "GameCardsUI",
  instanceKey: "game",
  slice: cardsUISlice,
});

// ---------------------------------------------------------------------------
// Cache adapter
// ---------------------------------------------------------------------------

export const useGameCardsCache: CardsCacheHook = () => {
  const queryKey = useGameActiveQueryKey();
  const cardsById = useGameStore(s => s.cardsById);

  const cardsCache: CardsCache = useMemo(
    () => ({
      getCard: (_id: string) => {
        const data = queryClient.getQueryData<
          GetMainModuleCardsResponseDto | GameSRCardsData
        >(queryKey);
        return (
          getEntries(data).find(card => card._id === _id) ?? cardsById[_id]
        );
      },
      getAllCards: () => {
        const data = queryClient.getQueryData<
          GetMainModuleCardsResponseDto | GameSRCardsData
        >(queryKey);
        const entries = getEntries(data);
        return entries.length ? entries : Object.values(cardsById);
      },
      set: (recipe: (entries: CardDto[]) => void) => {
        queryClient.setQueryData(
          queryKey,
          withProduce<GetMainModuleCardsResponseDto | GameSRCardsData>(
            draft => {
              recipe(draft.entries);
            },
          ),
        );
      },
      invalidate: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    }),
    [cardsById, queryKey],
  );

  return cardsCache;
};

// ---------------------------------------------------------------------------
// Derived card list (order + cache)
// ---------------------------------------------------------------------------

export const useOrderedGameCards = (): CardDto[] => {
  const orderIds = useGameStore(s => s.orderIds);
  const snapshotCardsById = useGameStore(s => s.cardsById);
  const { data } = useGameActiveCardsQuery();
  const entries = getEntries(data);

  const byId = useMemo(
    () => ({
      ...snapshotCardsById,
      ...Object.fromEntries(entries.map(c => [c._id, c])),
    }),
    [entries, snapshotCardsById],
  );

  return useMemo(
    () =>
      orderIds
        .map(id => byId[id])
        .filter((card): card is CardDto => card !== undefined),
    [orderIds, byId],
  );
};

export const useGameCardsById = (): Record<string, CardDto> => {
  const snapshotCardsById = useGameStore(s => s.cardsById);
  const { data } = useGameActiveCardsQuery();
  const entries = getEntries(data);

  return useMemo(
    () => ({
      ...snapshotCardsById,
      ...Object.fromEntries(entries.map(c => [c._id, c])),
    }),
    [entries, snapshotCardsById],
  );
};

export const useGameOrderLength = () => useGameStore(s => s.orderIds.length);

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------

export const useSaveSRAnswerMutation = () => {
  const cardsCache = useGameCardsCache();
  const updateCardSnapshot = useGameStore(s => s.updateCardSnapshot);

  return useMutation({
    mutationFn: ({ _id, answer }: { _id: string; answer: 1 | -1 }) =>
      srPutAnswer(_id, answer),
    onSuccess: (data, { _id }) => {
      saveLastUpdate();
      updateCardSnapshot(_id, data);
      cardsCache.set(entries => {
        const entry = entries.find(c => c._id === _id);
        if (!entry) return;
        Object.assign(entry, data);
      });
    },
  });
};

// ---------------------------------------------------------------------------
// Write answer check (replaces checkWriteAnswer thunk)
// ---------------------------------------------------------------------------

export const useCheckWriteAnswer = () => {
  const cardsCache = useGameCardsCache();
  const checkWriteAnswerReducer = useGameStore(s => s.checkWriteAnswerReducer);

  return useCallback(
    (not_know?: boolean) => {
      const {
        write: { remaining, answer },
      } = useGameStore.getState();

      const id = remaining[remaining.length - 1]?.id;
      if (!id) return;

      const card = cardsCache.getCard(id);
      if (!card) return;

      const formattedTerm = card.term.replace(/&nbsp;/g, " ").trim();

      checkWriteAnswerReducer({
        card_answer:
          answer === formattedTerm && !not_know ? "correct" : "incorrect",
        answer: not_know ? "" : answer,
      });
    },
    [cardsCache, checkWriteAnswerReducer],
  );
};
