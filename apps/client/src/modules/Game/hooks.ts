import { mainGetModuleCards } from "@api/methods/main/mainGetModuleCards";
import { srGetCards } from "@api/methods/sr/srGetCards";
import { srPutAnswer } from "@api/methods/sr/srPutAnswer";
import { queryClient } from "@api/queryClient";
import {
  CardsCache,
  CardsCacheHook,
  cardsUISlice,
} from "@components/Cards";
import type { CardDto, GetMainModuleCardsResponseDto } from "@flashcards/common";
import { useAppSelector } from "@store/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { saveLastUpdate } from "@utils/saveLastUpdate";
import { useGameStore } from "@zustand/game/gameStore";
import { createStoreHook, withProduce } from "@zustand/helpers";
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
  const srNumber =
    isSR && typeof number === "string" ? +number : undefined;

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
  const user = useAppSelector(s => s.auth.user);

  return useQuery({
    queryKey: getGameModuleCardsQueryKey(moduleId),
    queryFn: () => mainGetModuleCards({ _id: moduleId!, created: "oldest" }),
    enabled: !!user && !!moduleId,
  });
};

export const useGameSRCardsQuery = () => {
  const { srNumber, isSR } = useGameRouteParams();
  const user = useAppSelector(s => s.auth.user);

  return useQuery({
    queryKey: getGameSRCardsQueryKey(srNumber),
    queryFn: async () => {
      const { cards } = await srGetCards(srNumber!);

      if (!cards.length) {
        window.location.replace("/home/sr");
        throw new Error("No cards to repeat.");
      }

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

  const cardsCache: CardsCache = useMemo(
    () => ({
      getCard: (_id: string) => {
        const data = queryClient.getQueryData<
          GetMainModuleCardsResponseDto | GameSRCardsData
        >(queryKey);
        return getEntries(data).find(card => card._id === _id);
      },
      getAllCards: () => {
        const data = queryClient.getQueryData<
          GetMainModuleCardsResponseDto | GameSRCardsData
        >(queryKey);
        return getEntries(data);
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
    [queryKey],
  );

  return cardsCache;
};

// ---------------------------------------------------------------------------
// Derived card list (order + cache)
// ---------------------------------------------------------------------------

export const useOrderedGameCards = (): CardDto[] => {
  const orderIds = useGameStore(s => s.orderIds);
  const { data } = useGameActiveCardsQuery();
  const entries = getEntries(data);

  const byId = useMemo(
    () => Object.fromEntries(entries.map(c => [c._id, c])),
    [entries],
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
  const { data } = useGameActiveCardsQuery();
  const entries = getEntries(data);

  return useMemo(
    () => Object.fromEntries(entries.map(c => [c._id, c])),
    [entries],
  );
};

export const useGameOrderLength = () => useGameStore(s => s.orderIds.length);

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------

export const useSaveSRAnswerMutation = () => {
  const cardsCache = useGameCardsCache();

  return useMutation({
    mutationFn: ({ _id, answer }: { _id: string; answer: 1 | -1 }) =>
      srPutAnswer(_id, answer),
    onSuccess: (data, { _id }) => {
      saveLastUpdate();
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
