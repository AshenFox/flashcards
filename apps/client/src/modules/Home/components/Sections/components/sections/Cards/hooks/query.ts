import { mainGetCards } from "@api/methods/main/mainGetCards";
import type { GetMainCardsResponseDto } from "@flashcards/common";
import { useAppSelector } from "@store/store";
import { type InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import type { CardsFilters } from "@zustand/filters";
import { useEffect } from "react";

import { useHomeCardsFiltersStore } from "./stores";

/** Sliding window of cached pages; must be greater than 2 for trim + prepend flow. */
export const HOME_CARDS_MAX_CACHED_PAGES = 3;
export const HOME_CARDS_PAGE_SIZE = 50;

// ---------------------------------------------------------------------------
// Infinite query
// ---------------------------------------------------------------------------

export const getQueryKey = (filters: CardsFilters) => ["home", "cards", filters] as const;

export type HomeCardsQueryResult = ReturnType<typeof useHomeCardsQuery>;

export const useHomeCardsQuery = () => {
    const user = useAppSelector((s) => s.auth.user);
    const filters = useHomeCardsFiltersStore((state) => state.filters);
    const setPagination = useHomeCardsFiltersStore((state) => state.setPagination);

    const query = useInfiniteQuery<
        GetMainCardsResponseDto,
        Error,
        InfiniteData<GetMainCardsResponseDto, number>,
        ReturnType<typeof getQueryKey>,
        number
    >({
        queryKey: getQueryKey(filters),
        queryFn: ({ pageParam }) => mainGetCards({ ...filters, page: pageParam, size: HOME_CARDS_PAGE_SIZE }),
        initialPageParam: 0,
        maxPages: HOME_CARDS_MAX_CACHED_PAGES,
        getPreviousPageParam: (firstPage: GetMainCardsResponseDto) =>
            firstPage.pagination.page > 0 ? firstPage.pagination.page - 1 : undefined,
        getNextPageParam: (lastPage: GetMainCardsResponseDto) =>
            lastPage.pagination.end ? undefined : lastPage.pagination.page + 1,
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


