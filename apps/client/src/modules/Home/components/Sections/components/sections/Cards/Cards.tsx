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

import { CardsUIProvider, useDefaultCardUIStore } from "@zustand/cards";
import type { Card as CardType } from "@zustand/cards";
import { useHomeCardsFiltersStore, useHomeCardsQuery } from "./hooks";

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

  const uiCards = useDefaultCardUIStore(s => s.cards);
  const resetUIStore = useDefaultCardUIStore(s => s.reset);
  const getUI = useDefaultCardUIStore(s => s.get);

  const rawCards = useMemo(
    () => data?.pages.flatMap(p => p.entries) ?? [],
    [data],
  );

  const cards: CardType[] = useMemo(
    () =>
      rawCards.map(dto => {
        const ui = uiCards[dto._id] ?? getUI(dto._id);
        return { ...dto, ...ui };
      }),
    [rawCards, uiCards, getUI],
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
      useCardsUIStore={useDefaultCardUIStore}
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
      {cards.map((card, i) => {
        const prevDateString = cards[i - 1]?.creation_date;
        const curDateString = card.creation_date;

        return (
          <Fragment key={card._id}>
            <Divider
              prevDateString={prevDateString}
              curDateString={curDateString}
            />
            {card.edit ? (
              <EditCard data={card} toggle={true} loading={loading} />
            ) : (
              <Card data={card} filter={search} filterType={by} isModuleLink />
            )}
          </Fragment>
        );
      })}
      <ScrollLoader active={loading} />
      {!loading && (
        <NotFound
          resultsFound={cards.length}
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
