import { mainGetModule } from "@api/methods/main/mainGetModule";
import { queryClient } from "@api/queryClient";
import { CardsCache, CardsCacheHook, cardsUISlice } from "@components/Cards";
import type { CardDto, GetMainModuleResponseDto } from "@flashcards/common";
import { useAppSelector } from "@store/store";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ModuleCardsFilters } from "@zustand/filters";
import { createModuleCardsFilterSlice } from "@zustand/filters";
import { createStoreHook, withProduce } from "@zustand/helpers";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

// ---------------------------------------------------------------------------
// Query key
// ---------------------------------------------------------------------------

export const getQueryKey = (moduleId: string | undefined, filters: ModuleCardsFilters) =>
  ["module", moduleId, filters] as const;

// ---------------------------------------------------------------------------
// Query
// ---------------------------------------------------------------------------

export type ModuleQueryResult = ReturnType<typeof useModuleQuery>;

// to-do break up this query into two queries: one for the module and one for the cards
export const useModuleQuery = () => {
  const router = useRouter();
  const { _id } = router.query;

  const moduleId = typeof _id === "string" ? _id : undefined;

  const user = useAppSelector((s) => s.auth.user);
  const filters = useModuleFiltersStore((state) => state.filters);

  return useQuery({
    queryKey: getQueryKey(moduleId, filters),
    queryFn: () => mainGetModule({ _id: moduleId!, ...filters }),
    enabled: !!user && !!moduleId,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};

export const useSyncModulePagination = (data: GetMainModuleResponseDto) => {
  const setPagination = useModuleFiltersStore((state) => state.setPagination);
  const pagination = data?.cards?.pagination;

  useEffect(() => {
    if (pagination) setPagination(pagination)
    else setPagination(null);
  }, [pagination, setPagination]);
};

// ---------------------------------------------------------------------------
// Filters store (query key needs moduleId, so the slice stores a partial key builder)
// ---------------------------------------------------------------------------

const filtersQueryKey = (filters: ModuleCardsFilters) =>
  ["module", filters] as const;

export const useModuleFiltersStore = createStoreHook({
  storeName: "ModuleCardsFilters",
  instanceKey: "module-cards",
  slice: createModuleCardsFilterSlice({ queryKey: filtersQueryKey }),
});

// ---------------------------------------------------------------------------
// Cards UI store
// ---------------------------------------------------------------------------

export const useModuleCardsUIStore = createStoreHook({
  storeName: "ModuleCardsUI",
  instanceKey: "module-cards",
  slice: cardsUISlice,
});

// ---------------------------------------------------------------------------
// Cache adapter
// ---------------------------------------------------------------------------

type ModuleCache = GetMainModuleResponseDto;

const getEntries = (data: ModuleCache | undefined): CardDto[] => {
  if (!data) return [];
  return data.cards.entries;
};

export const useModuleCardsCache: CardsCacheHook = () => {
  const filters = useModuleFiltersStore((state) => state.filters);
  const moduleId = useModuleIdFromQuery();
  const queryKey = useMemo(() => getQueryKey(moduleId, filters), [moduleId, filters]);

  const cardsCache: CardsCache = useMemo(
    () => ({
      getCard: (_id: string) => {
        const data = queryClient.getQueryData<ModuleCache>(queryKey);
        return getEntries(data).find((card) => card._id === _id);
      },
      getAllCards: () => {
        const data = queryClient.getQueryData<ModuleCache>(queryKey);
        return getEntries(data);
      },
      set: (recipe: (entries: CardDto[]) => void) => {
        queryClient.setQueryData(
          queryKey,
          withProduce<ModuleCache>((draft) => {
            recipe(draft.cards.entries);
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
// Helper: read moduleId from router (avoids prop drilling for cache hook)
// ---------------------------------------------------------------------------

const useModuleIdFromQuery = (): string | undefined => {
  const router = useRouter();
  const { _id } = router.query;
  return typeof _id === "string" ? _id : undefined;
};
