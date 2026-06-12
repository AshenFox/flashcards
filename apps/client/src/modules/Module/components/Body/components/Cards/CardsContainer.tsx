import NotFound from "@components/NotFound";
import { VirtualizedItem, VirtualizedList } from "@components/Virtualized";
import ScrollTop from "@modules/ScrollTop";
import ScrollLoader from "@ui/ScrollLoader";
import { memo } from "react";

import { useModuleCardsQuery, useModuleFiltersStore } from "../../../../hooks";
import CardRow from "./CardRow";
import { useModuleCardsVirtualizer } from "./hooks/useModuleCardsVirtualizer";
import s from "./styles.module.scss";

const CardsContainer = () => {
  const { data, isFetching, isLoading } = useModuleCardsQuery();
  const cards = data?.entries ?? [];
  const resultsFound = data?.entries.length;

  const search = useModuleFiltersStore(s => s.filters.search);
  const virtualizer = useModuleCardsVirtualizer(cards);

  return (
    <div className={s.cardsContainer}>
      {!isLoading && (
        <VirtualizedList totalSize={virtualizer.getTotalSize()}>
          {virtualizer.getVirtualItems().map(virtualItem => {
            const card = cards[virtualItem.index];
            if (!card) return null;

            return (
              <VirtualizedItem
                key={card._id}
                virtualizer={virtualizer}
                virtualItem={virtualItem}
              >
                <CardRow data={card} loading={isFetching} />
              </VirtualizedItem>
            );
          })}
        </VirtualizedList>
      )}
      <ScrollLoader active={isLoading} />
      <ScrollTop virtualizer={virtualizer} />
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
