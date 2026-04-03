import { CardsUIProvider } from "@components/Cards";
import Filters, { FilterData, SetFilterValue } from "@components/Filters";
import NotFound from "@components/NotFound";
import { VirtualizedItem, VirtualizedList } from "@components/Virtualized";
import ScrollTop from "@modules/ScrollTop";
import { useQueryClient } from "@tanstack/react-query";
import ScrollLoader from "@ui/ScrollLoader";
import { defaultCardsFilters } from "@zustand/filters";
import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";

import s from "../styles.module.scss";
import { CardRow } from "./CardRow";
import { useHomeCardsCache } from "./hooks/cache";
import { useCardsVirtualizer } from "./hooks/cardsVirtualizer";
import { getQueryKey, useHomeCardsQuery } from "./hooks/query";
import { useHomeCardsFiltersStore, useHomeCardsUIStore } from "./hooks/stores";
import { useGlobalHeaderPullForHomeCards } from "./hooks/useGlobalHeaderPullForHomeCards";

const filtersData: FilterData[] = [
  {
    id: "created",
    label: "Date Order",
    defaultValue: defaultCardsFilters.created,
    options: [
      { value: "newest", label: "Newest" },
      { value: "oldest", label: "Oldest" },
    ],
  },
  {
    id: "sr",
    label: "SR",
    defaultValue: defaultCardsFilters.sr,
    options: [
      { value: "all", label: "All" },
      { value: "in-lowest", label: "In Lowest" },
      { value: "in-highest", label: "In Highest" },
      { value: "out", label: "Out" },
    ],
  },
  {
    id: "by",
    label: "By",
    defaultValue: defaultCardsFilters.by,
    options: [
      { value: "term", label: "Term" },
      { value: "definition", label: "Definition" },
    ],
  },
];

/** When the first visible virtual row is at or above this index, load the previous page. */
const FETCH_PREV_VISIBLE_THRESHOLD = 5;

const Cards = () => {
  const listTopRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();
  const filters = useHomeCardsFiltersStore(state => state.filters);
  const pagination = useHomeCardsFiltersStore(state => state.pagination);
  const setFilter = useHomeCardsFiltersStore(state => state.setFilter);
  const resetFilters = useHomeCardsFiltersStore(state => state.resetFilters);

  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isFetching,
  } = useHomeCardsQuery();

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

  const virtualizer = useCardsVirtualizer({
    rawCards,
    infiniteData: data,
  });

  useGlobalHeaderPullForHomeCards({
    listTopRef,
    hasPreviousPage: !!hasPreviousPage,
    hasData: !!data,
  });

  const { search, by } = filters;

  const setFilterValue = useCallback<SetFilterValue>(
    (filter, value) => {
      setFilter(filter as keyof typeof filters, value);
    },
    [setFilter],
  );

  const resetData = useCallback(() => {
    resetUIStore();
  }, [resetUIStore]);

  useEffect(() => {
    const maybeFetchNext = () => {
      if (!hasNextPage || isFetchingNextPage) return;
      const items = virtualizer.getVirtualItems();
      const lastItem = items[items.length - 1];
      if (!lastItem) return;
      if (lastItem.index >= rawCards.length - 1) {
        fetchNextPage();
      }
    };

    const maybeFetchPrevious = () => {
      if (!hasPreviousPage || isFetchingPreviousPage) return;
      const items = virtualizer.getVirtualItems();
      const firstItem = items[0];
      if (!firstItem) return;
      if (firstItem.index <= FETCH_PREV_VISIBLE_THRESHOLD) {
        fetchPreviousPage();
      }
    };

    const onScroll = () => {
      maybeFetchNext();
      maybeFetchPrevious();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [
    virtualizer,
    rawCards.length,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
  ]);

  useEffect(() => {
    return () => {
      resetUIStore();
    };
  }, [resetUIStore]);

  const loading = isFetching || isFetchingNextPage || isFetchingPreviousPage;

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
      <VirtualizedList ref={listTopRef} virtualizer={virtualizer}>
        {virtualizer.getVirtualItems().map(virtualItem => {
          const data = rawCards[virtualItem.index];
          return (
            <VirtualizedItem
              key={data._id}
              virtualizer={virtualizer}
              virtualItem={virtualItem}
            >
              <CardRow
                data={data}
                prevDateString={rawCards[virtualItem.index - 1]?.creation_date}
                search={search}
                by={by}
                isModuleLink
                loading={loading}
              />
            </VirtualizedItem>
          );
        })}
      </VirtualizedList>
      {/* <ScrollLoader active={loading} /> */}
      {/* <ScrollTop virtualizer={virtualizer} /> */}
      {!loading && (
        <NotFound
          resultsFound={resultsFound}
          filterValue={search}
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
