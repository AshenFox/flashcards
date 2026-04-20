import Filters, { SetFilterValue } from "@components/Filters";
import NotFound from "@components/NotFound";
import {
  useResetSlidingWindowVirtualizerToTrueTop,
  useSlidingWindowVirtualPagesFetch,
  VirtualizedItem,
  VirtualizedList,
} from "@components/Virtualized";
import type { GetMainModulesResponseDto } from "@flashcards/common";
import { useAppVerticalPull } from "@modules/AppWrapper";
import ScrollTop from "@modules/ScrollTop";
import { useQueryClient } from "@tanstack/react-query";
import ScrollLoader from "@ui/ScrollLoader";
import React, { memo, useCallback, useMemo, useRef } from "react";

import Divider from "../components/Divider";
import s from "../styles.module.scss";
import Module from "./components/Module";
import ModuleRow from "./components/ModuleRow";
import { FETCH_PREV_VISIBLE_THRESHOLD, filtersData } from "./constants";
import { buildHomeModulesItems } from "./hooks/items";
import {
  getQueryKey,
  HOME_MODULES_PAGE_SIZE,
  useHomeModulesQuery,
} from "./hooks/query";
import { useHomeModulesFiltersStore } from "./hooks/stores";
import { useHomeModulesSlidingWindowVirtualizer } from "./hooks/virtualizer";

const Modules = () => {
  const listTopRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const pagination = useHomeModulesFiltersStore(state => state.pagination);
  const filters = useHomeModulesFiltersStore(state => state.filters);
  const setFilter = useHomeModulesFiltersStore(state => state.setFilter);
  const resetFilters = useHomeModulesFiltersStore(state => state.resetFilters);

  const query = useHomeModulesQuery();
  const {
    data,
    hasPreviousPage,
    isFetchingPreviousPage,
    isFetchingNextPage,
    isFetching,
  } = query;

  const refreshModulesQuery = useCallback(() => {
    const filters = useHomeModulesFiltersStore.getState().filters;
    queryClient.invalidateQueries({ queryKey: getQueryKey(filters) });
  }, [queryClient]);

  const modules = useMemo(
    () => data?.pages.flatMap(p => p.entries) ?? [],
    [data],
  );

  const items = useMemo(
    () => buildHomeModulesItems(modules, !!hasPreviousPage),
    [modules, hasPreviousPage],
  );

  const draft = data?.pages[0]?.draft ?? null;
  const resultsFound = pagination?.number;

  const virtualizer = useHomeModulesSlidingWindowVirtualizer({
    items,
  });

  const getQueryKeyForReset = useCallback(
    () => getQueryKey(useHomeModulesFiltersStore.getState().filters),
    [],
  );

  const { resetToTrueTop, isResettingToTop } =
    useResetSlidingWindowVirtualizerToTrueTop<GetMainModulesResponseDto>({
      queryClient,
      getQueryKey: getQueryKeyForReset,
      virtualizer,
    });

  useAppVerticalPull({
    elementRef: listTopRef,
    tippingPoint: !!hasPreviousPage,
    enabled: !!data,
    blendDistancePx: HOME_MODULES_PAGE_SIZE * 140,
  });

  useSlidingWindowVirtualPagesFetch({
    virtualizer,
    itemCount: items.length,
    query,
    firstVisibleThreshold: FETCH_PREV_VISIBLE_THRESHOLD,
    enabled: !isResettingToTop,
  });

  const { search } = filters;

  const setFilterValue = useCallback<SetFilterValue>(
    (filter, value) => {
      setFilter(filter as keyof typeof filters, value);
    },
    [setFilter],
  );

  const loading =
    isResettingToTop ||
    isFetching ||
    isFetchingNextPage ||
    isFetchingPreviousPage;

  return (
    <>
      <Filters
        id="home-modules-filters"
        filtersValues={filters}
        filtersData={filtersData}
        placeholder={"Type to filter..."}
        className={s.filter}
        alwaysReload
        setFilterValue={setFilterValue}
        getData={refreshModulesQuery}
        resetFilters={resetFilters}
      />
      {draft && (
        <div className={s.draft}>
          <Divider draft />
          <Module data={draft} />
        </div>
      )}
      <VirtualizedList ref={listTopRef} totalSize={virtualizer.getTotalSize()}>
        {virtualizer.getVirtualItems().map(virtualItem => {
          const item = items[virtualItem.index];
          if (!item) return null;

          return (
            <VirtualizedItem
              key={item._id}
              virtualizer={virtualizer}
              virtualItem={virtualItem}
            >
              {item.type === "module" ? (
                <ModuleRow data={item.module} search={search} />
              ) : (
                <Divider label={item.label} />
              )}
            </VirtualizedItem>
          );
        })}
      </VirtualizedList>
      <ScrollLoader active={loading} />
      <ScrollTop
        virtualizer={virtualizer}
        onScrollTop={resetToTrueTop}
        enabled={!loading}
      />
      {!loading && (
        <NotFound
          resultsFound={resultsFound}
          filterValue={search}
          notFoundMsg={value =>
            value ? (
              <>
                No modules matching <b>{`"${value}"`}</b> found.
              </>
            ) : (
              <>No modules found.</>
            )
          }
          nothingMsg={<>You don&apos;t have any modules yet.</>}
        />
      )}
    </>
  );
};

export default memo(Modules);
