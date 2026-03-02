import Filters, { FilterData, SetFilterValue } from "@components/Filters";
import NotFound from "@components/NotFound";
import { useHomeModulesFiltersStore, useHomeModulesQuery } from "./hooks";
import ScrollLoader from "@ui/ScrollLoader";
import React, { Fragment, memo, useCallback, useEffect } from "react";

import Divider from "../components/Divider";
import s from "../styles.module.scss";
import Module from "./components/Module";
import { checkBottom } from "@helpers/functions/checkBottom";
import { defaultModulesFilters } from "@zustand/filters";

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
  const filters = useHomeModulesFiltersStore(state => state.filters);
  const setFilter = useHomeModulesFiltersStore(state => state.setFilter);
  const resetFilters = useHomeModulesFiltersStore(state => state.resetFilters);

  const {
    data,
    fetchNextPage,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useHomeModulesQuery();

  const modules = data?.pages.flatMap(p => p.modules.entries) ?? [];
  const draft = data?.pages[0]?.draft ?? null;

  const { search } = filters;

  const setFilterValue = useCallback<SetFilterValue>(
    (filter, value) => {
      setFilter(filter as keyof typeof filters, value);
    },
    [setFilter],
  );

  const resetData = useCallback(() => {
    // No-op: query key includes filters, so changing filters refetches; no list to clear.
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!checkBottom() || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

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
        getData={refetch}
        resetData={resetData}
        resetFilters={resetFilters}
      />
      {draft && (
        <Fragment>
          <Divider draft={!!draft} />
          <Module data={draft} />
        </Fragment>
      )}
      {modules.map((module, i) => {
        const prevDateString = modules[i - 1]?.creation_date;
        const curDateString = module.creation_date;

        return (
          <Fragment key={module._id}>
            <Divider
              prevDateString={prevDateString}
              curDateString={curDateString}
            />
            <Module data={module} filter={search} />
          </Fragment>
        );
      })}
      <ScrollLoader active={loading} />
      {!loading && (
        <NotFound
          resultsFound={modules.length}
          filterValue={search}
          notFoundMsg={value => (
            <>
              No modules matching <b>{`"${value}"`}</b> found.
            </>
          )}
          nothingMsg={<>You don&apos;t have any modules yet.</>}
        />
      )}
    </>
  );
};

export default memo(Modules);
