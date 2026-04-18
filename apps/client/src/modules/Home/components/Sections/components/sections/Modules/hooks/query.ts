import { mainGetModules } from "@api/methods/main/mainGetModules";
import type { GetMainModulesResponseDto, ModuleDto } from "@flashcards/common";
import { useAppSelector } from "@store/store";
import { type InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import type { ModulesFilters } from "@zustand/filters";
import { useEffect } from "react";

import { useHomeModulesFiltersStore } from "./stores";

/** Sliding window of cached pages; must be greater than 2 for trim + prepend flow. */
export const HOME_MODULES_MAX_CACHED_PAGES = 3;
export const HOME_MODULES_PAGE_SIZE = 50;

export type HomeModulesPage = {
  draft: ModuleDto | null;
  entries: ModuleDto[];
  pagination: GetMainModulesResponseDto["modules"]["pagination"];
};

export const getQueryKey = (filters: ModulesFilters) =>
  ["home", "modules", filters] as const;

export type HomeModulesQueryResult = ReturnType<typeof useHomeModulesQuery>;

export const useHomeModulesQuery = () => {
  const user = useAppSelector(s => s.auth.user);
  const filters = useHomeModulesFiltersStore(state => state.filters);
  const setPagination = useHomeModulesFiltersStore(
    state => state.setPagination,
  );

  const query = useInfiniteQuery<
    GetMainModulesResponseDto,
    Error,
    InfiniteData<HomeModulesPage, number>,
    ReturnType<typeof getQueryKey>,
    number
  >({
    queryKey: getQueryKey(filters),
    queryFn: ({ pageParam }) =>
      mainGetModules({
        ...filters,
        page: pageParam,
        size: HOME_MODULES_PAGE_SIZE,
      }),
    initialPageParam: 0,
    maxPages: HOME_MODULES_MAX_CACHED_PAGES,
    getPreviousPageParam: (firstPage, _, firstPageParam) =>
      firstPageParam > 0 ? firstPageParam - 1 : undefined,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.modules.pagination.end ? undefined : lastPageParam + 1,
    enabled: !!user,
    select: data => ({
      pageParams: data.pageParams,
      pages: data.pages.map(page => ({
        draft: page.draft,
        entries: page.modules.entries,
        pagination: page.modules.pagination,
      })),
    }),
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
