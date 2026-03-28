import { mainGetModule } from "@api/methods/main/mainGetModule";
import { mainGetModuleCards } from "@api/methods/main/mainGetModuleCards";
import { queryClient } from "@api/queryClient";
import { CardsCache, CardsCacheHook, cardsUISlice } from "@components/Cards";
import type {
  CardDto,
  GetMainModuleCardsResponseDto,
} from "@flashcards/common";
import { useAppSelector } from "@store/store";
import { useQuery } from "@tanstack/react-query";
import type { ModuleCardsFilters } from "@zustand/filters";
import { createModuleCardsFilterSlice } from "@zustand/filters";
import { createStoreHook, withProduce } from "@zustand/helpers";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

// ---------------------------------------------------------------------------
// Query keys
// ---------------------------------------------------------------------------

export const getModuleQueryKey = (moduleId: string | undefined) =>
  ["module", moduleId, "meta"] as const;

export const getModuleCardsQueryKey = (
  moduleId: string | undefined,
  filters?: ModuleCardsFilters,
) => {
  if (filters) return ["module", moduleId, "cards", filters] as const;
  return ["module", moduleId, "cards"] as const;
};

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

export type ModuleQueryResult = ReturnType<typeof useModuleQuery>;

export const useModuleQuery = () => {
  const router = useRouter();
  const { _id } = router.query;

  const moduleId = typeof _id === "string" ? _id : undefined;

  const user = useAppSelector((s) => s.auth.user);

  return useQuery({
    queryKey: getModuleQueryKey(moduleId),
    queryFn: () => mainGetModule({ _id: moduleId! }),
    enabled: !!user && !!moduleId,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};

export const useModuleCardsQuery = () => {
  const router = useRouter();
  const { _id } = router.query;

  const moduleId = typeof _id === "string" ? _id : undefined;

  const user = useAppSelector((s) => s.auth.user);
  const filters = useModuleFiltersStore((state) => state.filters);

  return useQuery({
    queryKey: getModuleCardsQueryKey(moduleId, filters),
    queryFn: () => mainGetModuleCards({ _id: moduleId!, ...filters }),
    enabled: !!user && !!moduleId,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};

export const useSyncModulePagination = (
  data: GetMainModuleCardsResponseDto | undefined,
) => {
  const setPagination = useModuleFiltersStore((state) => state.setPagination);
  const pagination = data?.pagination;

  useEffect(() => {
    if (pagination) setPagination(pagination);
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

const getEntries = (data: GetMainModuleCardsResponseDto | undefined): CardDto[] => {
  if (!data) return [];
  return data.entries;
};

export const useModuleCardsCache: CardsCacheHook = () => {
  const filters = useModuleFiltersStore((state) => state.filters);
  const moduleId = useModuleIdFromQuery();
  const queryKey = useMemo(
    () => getModuleCardsQueryKey(moduleId, filters),
    [moduleId, filters],
  );

  const cardsCache: CardsCache = useMemo(
    () => ({
      getCard: (_id: string) => {
        const data = queryClient.getQueryData<GetMainModuleCardsResponseDto>(
          queryKey,
        );
        return getEntries(data).find((card) => card._id === _id);
      },
      getAllCards: () => {
        const data = queryClient.getQueryData<GetMainModuleCardsResponseDto>(
          queryKey,
        );
        return getEntries(data);
      },
      set: (recipe: (entries: CardDto[]) => void) => {
        queryClient.setQueryData(
          queryKey,
          withProduce<GetMainModuleCardsResponseDto>((draft) => {
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
// Helper: read moduleId from router (avoids prop drilling for cache hook)
// ---------------------------------------------------------------------------

const useModuleIdFromQuery = (): string | undefined => {
  const router = useRouter();
  const { _id } = router.query;
  return typeof _id === "string" ? _id : undefined;
};
