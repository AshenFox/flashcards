import { useAppSelector } from '@store/store';
import React, { Fragment, memo } from 'react';
import Divider from '../Divider';
import EditCard from '@components/EditCard';
import Card from '@modules/module/content/Card';
import ScrollLoader from '@ui/ScrollLoader';
import NotFound from '@components/NotFound';

const Cards = () => {
  const loading = useAppSelector(s => s.main.loading);
  const cards = useAppSelector(s => s.main.cards);
  const search_cards = useAppSelector(s => s.main.search_cards);
  const select_by = useAppSelector(s => s.main.select_by);

  const formatted_cards = Object.values(cards);

  return (
    <>
      {formatted_cards.map((card, i) => {
        const prevDateString = formatted_cards[i - 1]?.creation_date;
        const curDateString = card.creation_date;

        return (
          <Fragment key={card._id}>
            <Divider prevDateString={prevDateString} curDateString={curDateString} />
            {card.edit ? (
              <EditCard data={card} toggle={true} loading={loading} />
            ) : (
              <Card
                data={card}
                filter={search_cards.value}
                filter_type={select_by.value}
              />
            )}
          </Fragment>
        );
      })}
      <ScrollLoader active={loading} />
      {!loading && (
        <NotFound
          resultsFound={formatted_cards.length}
          filterValue={search_cards.value}
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
