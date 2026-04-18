import { CardsUIProvider } from "@components/Cards";
import Filters, { SetFilterValue } from "@components/Filters";
import NotFound from "@components/NotFound";
import {
  useResetSlidingWindowVirtualizerToTrueTop,
  useSlidingWindowVirtualPagesFetch,
  VirtualizedItem,
  VirtualizedList,
} from "@components/Virtualized";
import type { GetMainCardsResponseDto } from "@flashcards/common";
import { useGlobalHeaderPull } from "@modules/Home/components/Sections/hooks/useGlobalHeaderPull";
import ScrollTop from "@modules/ScrollTop";
import { useQueryClient } from "@tanstack/react-query";
import ScrollLoader from "@ui/ScrollLoader";
import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";

import s from "../styles.module.scss";
import CardRow from "./components/CardRow";
import { FETCH_PREV_VISIBLE_THRESHOLD, filtersData } from "./constants";
import { useHomeCardsCache } from "./hooks/cache";
import {
  getQueryKey,
  HOME_CARDS_PAGE_SIZE,
  useHomeCardsQuery,
} from "./hooks/query";
import { useHomeCardsFiltersStore, useHomeCardsUIStore } from "./hooks/stores";
import { useHomeCardsSlidingWindowVirtualizer } from "./hooks/virtualizer";

const Cards = () => {
  const listTopRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const filters = useHomeCardsFiltersStore(state => state.filters);
  const pagination = useHomeCardsFiltersStore(state => state.pagination);
  const setFilter = useHomeCardsFiltersStore(state => state.setFilter);
  const resetFilters = useHomeCardsFiltersStore(state => state.resetFilters);

  const query = useHomeCardsQuery();

  const {
    data,
    hasPreviousPage,
    isFetchingPreviousPage,
    isFetchingNextPage,
    isFetching,
  } = query;

  const refreshCardsQuery = useCallback(() => {
    const filters = useHomeCardsFiltersStore.getState().filters;
    queryClient.invalidateQueries({ queryKey: getQueryKey(filters) });
  }, [queryClient]);

  const resetUIStore = useHomeCardsUIStore(s => s.reset);

  const rawCards = useMemo(
    () => data?.pages.flatMap(p => p.entries) ?? [],
    [data],
  );

  const resultsFound = pagination?.number;

  const virtualizer = useHomeCardsSlidingWindowVirtualizer({
    rawCards,
    infiniteData: data,
  });

  const getQueryKeyForReset = useCallback(
    () => getQueryKey(useHomeCardsFiltersStore.getState().filters),
    [],
  );

  const { resetToTrueTop, isResettingToTop } =
    useResetSlidingWindowVirtualizerToTrueTop<GetMainCardsResponseDto>({
      queryClient,
      getQueryKey: getQueryKeyForReset,
      virtualizer,
    });

  const blendDistancePx = HOME_CARDS_PAGE_SIZE * 200;

  useGlobalHeaderPull({
    topRef: listTopRef,
    tippingPoint: !!hasPreviousPage,
    enabled: !!data,
    blendDistancePx,
  });

  useSlidingWindowVirtualPagesFetch({
    virtualizer,
    itemCount: rawCards.length,
    query,
    firstVisibleThreshold: FETCH_PREV_VISIBLE_THRESHOLD,
    enabled: !isResettingToTop,
  });

  useEffect(() => {
    return () => {
      resetUIStore();
    };
  }, [resetUIStore]);

  const resetData = useCallback(() => {
    resetUIStore();
  }, [resetUIStore]);

  const loading =
    isResettingToTop ||
    isFetching ||
    isFetchingNextPage ||
    isFetchingPreviousPage;

  const setFilterValue = useCallback<SetFilterValue>(
    (filter, value) => {
      setFilter(filter as keyof typeof filters, value);
    },
    [setFilter],
  );

  return (
    <CardsUIProvider
      useCardsUIStore={useHomeCardsUIStore}
      useCardsCash={useHomeCardsCache}
    >
      <Filters
        id="home-cards-filters"
        filtersValues={filters}
        filtersData={filtersData}
        placeholder={"Type to filter..."}
        className={s.filter}
        alwaysReload
        setFilterValue={setFilterValue}
        getData={refreshCardsQuery}
        resetData={resetData}
        resetFilters={resetFilters}
      />
      <VirtualizedList ref={listTopRef} totalSize={virtualizer.getTotalSize()}>
        {virtualizer.getVirtualItems().map(virtualItem => {
          const row = rawCards[virtualItem.index];
          return (
            <VirtualizedItem
              key={row._id}
              virtualizer={virtualizer}
              virtualItem={virtualItem}
            >
              <CardRow
                data={row}
                prevDateString={rawCards[virtualItem.index - 1]?.creation_date}
                search={filters.search}
                by={filters.by}
                isModuleLink
                loading={loading}
              />
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
          filterValue={filters.search}
          notFoundMsg={value =>
            value ? (
              <>
                No cards matching <b>{`"${value}"`}</b> found.
              </>
            ) : (
              <>No cards found.</>
            )
          }
          nothingMsg={<>You don&apos;t have any cards yet.</>}
        />
      )}
    </CardsUIProvider>
  );
};

export default memo(Cards);
