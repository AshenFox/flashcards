import NotFound from "@components/NotFound";
import ScrollLoader from "@ui/ScrollLoader";
import { memo } from "react";

import { useModuleFiltersStore, useModuleQuery } from "../../../../hooks";
import CardRow from "./CardRow";
import s from "./styles.module.scss";

const CardsContainer = () => {
  const { data, isFetching, isLoading, isPlaceholderData } = useModuleQuery();
  const cards = data?.cards.entries ?? [];
  const resultsFound = data?.cards.entries.length;

  const search = useModuleFiltersStore(s => s.filters.search);

  return (
    <div className={s.cardsContainer}>
      {!isPlaceholderData &&
        cards.map(card => (
          <CardRow key={card._id} data={card} loading={isFetching} />
        ))}
      <ScrollLoader active={isLoading || isPlaceholderData} />
      {!isPlaceholderData && !isLoading && (
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
