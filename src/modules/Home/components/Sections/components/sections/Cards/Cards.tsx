import Card from "@components/Card";
import EditCard from "@components/EditCard";
import Filters, { FilterData, SetFilterValue } from "@components/Filters";
import NotFound from "@components/NotFound";
import { useActions } from "@store/hooks";
import { defaultHomeCardsFilters } from "@store/reducers/main/initState";
import { useAppSelector } from "@store/store";
import ScrollLoader from "@ui/ScrollLoader";
import React, { Fragment, memo, useCallback, useEffect, useMemo } from "react";

import Divider from "../components/Divider";
import s from "../styles.module.scss";

const filtersData: FilterData[] = [
  {
    id: "created",
    label: "Date Order",
    defaultValue: defaultHomeCardsFilters.created,
    options: [
      { value: "newest", label: "Newest" },
      { value: "oldest", label: "Oldest" },
    ],
  },
  {
    id: "sr",
    label: "SR",
    defaultValue: defaultHomeCardsFilters.sr,
    options: [
      { value: undefined, label: "All" },
      { value: true, label: "In" },
      { value: false, label: "Out" },
    ],
  },
  {
    id: "by",
    label: "By",
    defaultValue: defaultHomeCardsFilters.by,
    options: [
      { value: "term", label: "Term" },
      { value: "definition", label: "Definition" },
    ],
  },
];

const Cards = () => {
  const cards = useAppSelector(s => s.main.cards);
  const loading = useAppSelector(s => s.main.sections.homeCards.loading);
  const filters = useAppSelector(s => s.main.sections.homeCards.filters);
  const { search, by } = filters;

  const formatted_cards = useMemo(() => Object.values(cards), [cards]);

  const {
    getCards,
    resetHomeCardsData,
    setSectionFilter,
    resetSectionFilters,
  } = useActions();

  const setFilterValue = useCallback<SetFilterValue>(
    (filter, value) => {
      setSectionFilter({
        section: "homeCards",
        filter,
        value,
      });
    },
    [setSectionFilter],
  );

  const resetFilters = useCallback(() => {
    resetSectionFilters("homeCards");
  }, [resetSectionFilters]);

  useEffect(() => {
    return () => {
      resetHomeCardsData();
    };
  }, []);

  return (
    <>
      <Filters
        filtersValues={filters}
        filtersData={filtersData}
        placeholder={"Type to filter..."}
        className={s.filter}
        alwaysReload
        setFilterValue={setFilterValue}
        getData={getCards}
        resetData={resetHomeCardsData}
        resetFilters={resetFilters}
      />
      {formatted_cards.map((card, i) => {
        const prevDateString = formatted_cards[i - 1]?.creation_date;
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
          resultsFound={formatted_cards.length}
          filterValue={search}
          notFoundMsg={value => (
            <>
              No cards matching <b>{`"${value}"`}</b> found.
            </>
          )}
          nothingMsg={<>You don&apos;t have any cards yet.</>}
        />
      )}
    </>
  );
};

export default memo(Cards);
