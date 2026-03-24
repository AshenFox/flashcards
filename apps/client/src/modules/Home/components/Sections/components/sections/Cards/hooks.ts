import { mainGetCards } from "@api/methods/main/mainGetCards";
import { queryClient } from "@api/queryClient";
import { CardsCache, CardsCacheHook, cardsUISlice } from "@components/Cards";
import type { CardDto, GetMainCardsResponseDto } from "@flashcards/common";
import { useAppSelector } from "@store/store";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { CardsFilters } from "@zustand/filters";
import { createCardsFilterSlice } from "@zustand/filters";
import { createStoreHook, withProduce } from "@zustand/helpers";
import { useEffect, useMemo } from "react";

// ---------------------------------------------------------------------------
// Infinite query
// ---------------------------------------------------------------------------

export const getQueryKey = (filters: CardsFilters) => ["home", "cards", filters] as const;

export type HomeCardsQueryResult = ReturnType<typeof useHomeCardsQuery>;

export const useHomeCardsQuery = () => {
    const user = useAppSelector((s) => s.auth.user);
    const filters = useHomeCardsFiltersStore((state) => state.filters);
    const setPagination = useHomeCardsFiltersStore((state) => state.setPagination);

    const query = useInfiniteQuery({
        queryKey: getQueryKey(filters),
        queryFn: ({ pageParam }: { pageParam: number }) =>
            mainGetCards({ ...filters, page: pageParam }),
        getNextPageParam: (lastPage: GetMainCardsResponseDto) =>
            lastPage.pagination.end ? undefined : lastPage.pagination.page + 1,
        initialPageParam: 0,
        enabled: !!user,
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false,
    });

    const { data } = query;

    useEffect(() => {
        if (data?.pages?.length) {
            const lastPage = data.pages[data.pages.length - 1];
            setPagination(lastPage.pagination);
        } else {
            setPagination(null);
        }
    }, [data?.pages, setPagination]);

    return query;
};

// ---------------------------------------------------------------------------
// Filters store
// ---------------------------------------------------------------------------

export const useHomeCardsFiltersStore = createStoreHook({
    storeName: "HomeCardsFilters",
    instanceKey: "home-cards",
    slice: createCardsFilterSlice({ queryKey: getQueryKey }),
});

export const useHomeCardsUIStore = createStoreHook({
    storeName: "HomeCardsUI",
    instanceKey: "home-cards",
    slice: cardsUISlice,
});

// ---------------------------------------------------------------------------
// Cache
// ---------------------------------------------------------------------------

export type MainCardsCache = { pages: GetMainCardsResponseDto[] };

const getEntries = (data: MainCardsCache | undefined): CardDto[] => {
    if (!data) return [];
    return data.pages.flatMap(page => page.entries);
};


export const useHomeCardsCache: CardsCacheHook = () => {
    const filters = useHomeCardsFiltersStore(state => state.filters);
    const queryKey = useMemo(() => getQueryKey(filters), [filters]);

    const cardsCache: CardsCache = useMemo(() => ({
        getCard: (_id: string) => {
            const data = queryClient.getQueryData<MainCardsCache>(queryKey);
            const entries = getEntries(data);
            return entries.find(card => card._id === _id);
        },
        getAllCards: () => {
            const data = queryClient.getQueryData<MainCardsCache>(queryKey);
            return getEntries(data);
        },
        set: (recipe: (entries: CardDto[]) => void) => {
            queryClient.setQueryData(
                queryKey,
                withProduce<MainCardsCache>(draft => {
                    recipe(draft.pages.flatMap(page => page.entries));
                }),
            );
        },
        invalidate: () => {
            queryClient.invalidateQueries({ queryKey });
        },
    }), [queryKey]);


    return cardsCache;
};
