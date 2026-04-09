import NotFound from "@components/NotFound";
import ScrollLoader from "@ui/ScrollLoader";
import { memo } from "react";

import { useModuleCardsQuery, useModuleFiltersStore } from "../../../../hooks";
import CardRow from "./CardRow";
import s from "./styles.module.scss";

const CardsContainer = () => {
  const { data, isFetching, isLoading } = useModuleCardsQuery();
  const cards = data?.entries ?? [];
  const resultsFound = data?.entries.length;

  const search = useModuleFiltersStore(s => s.filters.search);

  return (
    <div className={s.cardsContainer}>
      {!isLoading &&
        cards.map(card => (
          <CardRow key={card._id} data={card} loading={isFetching} />
        ))}
      <ScrollLoader active={isLoading} />
      {!isLoading && (
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
        />
      )}
    </div>
  );
};

export default memo(CardsContainer);
