import Filters, { FilterData, SetFilterValue } from "@components/Filters";
import NotFound from "@components/NotFound";
import { VirtualizedItem, VirtualizedList } from "@components/Virtualized";
import ScrollTop from "@modules/ScrollTop";
import { useQueryClient } from "@tanstack/react-query";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import ScrollLoader from "@ui/ScrollLoader";
import { defaultModulesFilters } from "@zustand/filters";
import React, { memo, useCallback, useEffect, useMemo } from "react";

import Divider from "../components/Divider";
import s from "../styles.module.scss";
import Module from "./components/Module";
import {
  queryKey,
  useHomeModulesFiltersStore,
  useHomeModulesQuery,
} from "./hooks";

const filtersData: FilterData[] = [
  {
    id: "created",
    label: "Date Order",
    defaultValue: defaultModulesFilters.created,
    options: [
      { value: "newest", label: "Newest" },
      { value: "oldest", label: "Oldest" },
    ],
  },
  {
    id: "sr",
    label: "SR",
    defaultValue: defaultModulesFilters.sr,
    options: [
      { value: undefined, label: "All" },
      { value: true, label: "In" },
      { value: false, label: "Out" },
    ],
  },
  {
    id: "draft",
    label: "Draft",
    defaultValue: defaultModulesFilters.draft,
    options: [
      { value: true, label: "Show" },
      { value: false, label: "Hide" },
    ],
  },
];

const Modules = () => {
  const queryClient = useQueryClient();
  const filters = useHomeModulesFiltersStore(state => state.filters);
  const setFilter = useHomeModulesFiltersStore(state => state.setFilter);
  const resetFilters = useHomeModulesFiltersStore(state => state.resetFilters);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useHomeModulesQuery();

  const refreshModulesQuery = useCallback(() => {
    const filters = useHomeModulesFiltersStore.getState().filters;
    queryClient.invalidateQueries({ queryKey: queryKey(filters) });
  }, [queryClient]);

  const modules = useMemo(
    () => data?.pages.flatMap(p => p.modules.entries) ?? [],
    [data],
  );
  const draft = data?.pages[0]?.draft ?? null;

  const virtualizer = useWindowVirtualizer({
    count: modules.length,
    estimateSize: () => 160,
    overscan: 5,
    gap: 15,
  });

  const { search } = filters;

  const setFilterValue = useCallback<SetFilterValue>(
    (filter, value) => {
      setFilter(filter as keyof typeof filters, value);
    },
    [setFilter],
  );

  useEffect(() => {
    const maybeFetchNext = () => {
      if (!hasNextPage || isFetchingNextPage) return;
      const items = virtualizer.getVirtualItems();
      const lastItem = items[items.length - 1];
      if (!lastItem) return;
      if (lastItem.index >= modules.length - 1) {
        fetchNextPage();
      }
    };

    maybeFetchNext();
    window.addEventListener("scroll", maybeFetchNext, { passive: true });
    return () => window.removeEventListener("scroll", maybeFetchNext);
  }, [
    virtualizer,
    modules.length,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  const loading = isFetching || isFetchingNextPage;

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
        <div>
          <Divider draft={!!draft} />
          <Module data={draft} />
        </div>
      )}
      <VirtualizedList virtualizer={virtualizer}>
        {virtualizer.getVirtualItems().map(virtualRow => {
          const module = modules[virtualRow.index];
          const prevDateString = modules[virtualRow.index - 1]?.creation_date;

          return (
            <VirtualizedItem
              key={module._id}
              virtualizer={virtualizer}
              virtualItem={virtualRow}
            >
              <Divider
                prevDateString={prevDateString}
                curDateString={module.creation_date}
              />
              <Module data={module} filter={search} />
            </VirtualizedItem>
          );
        })}
      </VirtualizedList>
      <ScrollLoader active={loading} />
      <ScrollTop virtualizer={virtualizer} />
      {!loading && (
        <NotFound
          resultsFound={modules.length}
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
