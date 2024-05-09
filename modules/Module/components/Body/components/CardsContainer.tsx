import Card from "@components/Card";
import EditCard from "@components/EditCard";
import NotFound from "@components/NotFound";
import { useAppSelector } from "@store/hooks";
import ScrollLoader from "@ui/ScrollLoader";
import { memo } from "react";

const CardsContainer = () => {
  const cards = useAppSelector(s => s.main.cards);
  const loading = useAppSelector(s => s.main.loading);
  const search_cards = useAppSelector(s => s.main.search_cards);
  const select_by = useAppSelector(s => s.main.select_by);

  const formatted_cards = Object.values(cards);

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
          <Card
            key={card._id}
            data={card}
            filter={search_cards.value}
            filterType={select_by.value}
          />
        ),
      )}
      {loading && <ScrollLoader active={loading} />}
      {!loading && (
        <NotFound
          resultsFound={formatted_cards.length}
          filterValue={search_cards.value}
          notFoundMsg={value => (
            <>
              No cards matching <b>{`"${value}"`}</b> found.
            </>
          )}
        />
      )}
    </div>
  );
};

export default memo(CardsContainer);
