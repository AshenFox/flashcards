import { mainGetModules } from "@api/methods/main/mainGetModules";
import type { GetMainModulesResponseDto } from "@flashcards/common";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAppSelector } from "@store/store";
import { useEffect } from "react";

import { createModulesFilterSlice } from "@zustand/filters";
import type { ModulesFilters } from "@zustand/filters";
import { createStoreHook } from "@zustand/helpers";

export const queryKey = (filters: ModulesFilters) => ["home", "modules", filters] as const;

export const useHomeModulesQuery = () => {
    const user = useAppSelector((s) => s.auth.user);
    const filters = useHomeModulesFiltersStore((state) => state.filters);
    const setPagination = useHomeModulesFiltersStore((state) => state.setPagination);

    const query = useInfiniteQuery({
        queryKey: queryKey(filters),
        queryFn: ({ pageParam }: { pageParam: number }) =>
            mainGetModules({ ...filters, page: pageParam }),
        getNextPageParam: (lastPage: GetMainModulesResponseDto) =>
            lastPage.modules.pagination.end
                ? undefined
                : lastPage.modules.pagination.page + 1,
        initialPageParam: 0,
        enabled: !!user,
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false,
    });

    const { data } = query;

    useEffect(() => {
        if (data?.pages?.length) {
            setPagination(data.pages[data.pages.length - 1].modules.pagination);
        } else {
            setPagination(null);
        }
    }, [data?.pages, setPagination]);

    return query;
};

export const useHomeModulesFiltersStore = createStoreHook({
    storeName: "HomeModulesFilters",
    instanceKey: "home-modules",
    slice: createModulesFilterSlice({ queryKey }),
});




