import { mainGetCards } from "@api/methods/main/mainGetCards";
import type { GetMainCardsResponseDto } from "@flashcards/common";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAppSelector } from "@store/store";

import { createCardsFilterSlice } from "@zustand/filters";
import type { CardsFilters } from "@zustand/filters";
import { createStoreHook } from "@zustand/helpers";
import { useEffect } from "react";
import { cardsUISlice } from "@zustand/cards";

// ---------------------------------------------------------------------------
// Infinite query
// ---------------------------------------------------------------------------

export const queryKey = (filters: CardsFilters) => ["home", "cards", filters] as const;

export type HomeCardsQueryResult = ReturnType<typeof useHomeCardsQuery>;

export const useHomeCardsQuery = () => {
    const user = useAppSelector((s) => s.auth.user);
    const filters = useHomeCardsFiltersStore((state) => state.filters);
    const setPagination = useHomeCardsFiltersStore((state) => state.setPagination);

    const query = useInfiniteQuery({
        queryKey: queryKey(filters),
        queryFn: ({ pageParam }: { pageParam: number }) =>
            mainGetCards({ ...filters, page: pageParam }),
        getNextPageParam: (lastPage: GetMainCardsResponseDto) =>
            lastPage.pagination.end ? undefined : lastPage.pagination.page + 1,
        initialPageParam: 0,
        enabled: !!user,
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
    slice: createCardsFilterSlice({ queryKey }),
});

export const useHomeCardsUIStore = createStoreHook({
    storeName: "HomeCardsUI",
    instanceKey: "home-cards",
    slice: cardsUISlice,
});