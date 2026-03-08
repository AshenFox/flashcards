import Card from "@components/Card";
import EditCard from "@components/EditCard";
import Filters, { FilterData, SetFilterValue } from "@components/Filters";
import NotFound from "@components/NotFound";
import { checkBottom } from "@helpers/functions/checkBottom";
import { defaultCardsFilters } from "@zustand/filters";
import ScrollLoader from "@ui/ScrollLoader";
import React, { Fragment, memo, useCallback, useEffect, useMemo } from "react";

import Divider from "../components/Divider";
import s from "../styles.module.scss";

import type { CardDto } from "@flashcards/common";
import { CardsUIProvider, useCardsUIStore } from "@zustand/cards";
import {
  useHomeCardsFiltersStore,
  useHomeCardsQuery,
  useHomeCardsUIStore,
} from "./hooks";

type CardRowProps = {
  data: CardDto;
  prevDateString: string | undefined;
  search: string;
  by: string;
  isModuleLink: boolean;
  loading: boolean;
};

const CardRow = memo(
  ({
    data,
    prevDateString,
    search,
    by,
    isModuleLink,
    loading,
  }: CardRowProps) => {
    const { _id, creation_date } = data || {};

    const edit = useCardsUIStore(s => s.get(data._id).edit);

    return (
      <Fragment>
        <Divider
          prevDateString={prevDateString}
          curDateString={data.creation_date}
        />
        {edit ? (
          <EditCard data={data} toggle={true} loading={loading} />
        ) : (
          <Card
            data={data}
            filter={search}
            filterType={by}
            isModuleLink={isModuleLink}
          />
        )}
      </Fragment>
    );
  },
);
CardRow.displayName = "CardRow";

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

const Cards = () => {
  const filters = useHomeCardsFiltersStore(state => state.filters);
  const setFilter = useHomeCardsFiltersStore(state => state.setFilter);
  const resetFilters = useHomeCardsFiltersStore(state => state.resetFilters);

  const {
    data,
    fetchNextPage,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useHomeCardsQuery();

  const resetUIStore = useHomeCardsUIStore(s => s.reset);

  const rawCards = useMemo(
    () => data?.pages.flatMap(p => p.entries) ?? [],
    [data],
  );

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
    const onScroll = () => {
      if (!checkBottom() || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    return () => {
      resetUIStore();
    };
  }, [resetUIStore]);

  const loading = isFetching || isFetchingNextPage;

  return (
    <CardsUIProvider
      useCardsFiltersStore={useHomeCardsFiltersStore}
      useCardsUIStore={useHomeCardsUIStore}
    >
      <Filters
        id="home-cards-filters"
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
      {rawCards.map((data, i) => (
        <CardRow
          key={data._id}
          data={data}
          prevDateString={rawCards[i - 1]?.creation_date}
          search={search}
          by={by}
          isModuleLink
          loading={loading}
        />
      ))}
      <ScrollLoader active={loading} />
      {!loading && (
        <NotFound
          resultsFound={rawCards.length}
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
