import Card from "@components/Card";
import EditCard from "@components/EditCard";
import NotFound from "@components/NotFound";
import { useAppSelector } from "@store/hooks";
import ScrollLoader from "@ui/ScrollLoader";
import { memo, useMemo } from "react";

const CardsContainer = () => {
  const cards = useAppSelector(s => s.main.cards);
  const loading = useAppSelector(s => s.main.sections.module.loading);
  const search = useAppSelector(s => s.main.sections.module.filters.search);
  const by = useAppSelector(s => s.main.sections.module.filters.by);

  const formatted_cards = useMemo(() => Object.values(cards), [cards]);

  return (
    <div>
      {formatted_cards.map(card =>
        card.edit ? (
          <EditCard
            key={card._id}
            data={card}
            toggle={true}
            loading={loading}
          />
        ) : (
          <Card key={card._id} data={card} filter={search} filterType={by} />
        ),
      )}
      {loading && <ScrollLoader active={loading} />}
      {!loading && (
        <NotFound
          resultsFound={formatted_cards.length}
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
