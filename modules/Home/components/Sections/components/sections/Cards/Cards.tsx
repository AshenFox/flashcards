import { useAppSelector } from '@store/store';
import React, { Fragment, memo } from 'react';
import Divider from '../components/Divider';
import EditCard from '@components/EditCard';
import ScrollLoader from '@ui/ScrollLoader';
import NotFound from '@components/NotFound';
import Filter, { Option } from '@components/Filter';
import { useActions } from '@store/hooks';
import s from '../styles.module.scss';
import Card from '@components/Card';

const optionsBy: Option[] = [
  { value: 'term', label: 'Term' },
  { value: 'defenition', label: 'Definition' },
];

const optionsCreated: Option[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
];

const Cards = () => {
  const loading = useAppSelector(s => s.main.loading);
  const cards = useAppSelector(s => s.main.cards);
  const search_cards = useAppSelector(s => s.main.search_cards);
  const select_by = useAppSelector(s => s.main.select_by);
  const select_created = useAppSelector(s => s.main.select_created);

  const formatted_cards = Object.values(cards);

  const {
    get_cards,
    control_search_cards,
    reset_fields_cards,
    set_select_created,
    set_select_by,
  } = useActions();

  return (
    <>
      <Filter
        className={s.filter}
        getData={get_cards}
        resetData={reset_fields_cards}
        search={{
          value: search_cards.value,
          setValue: control_search_cards,
          placeholder: 'Type to filter by ...',
        }}
        selects={[
          {
            id: 'by',
            value: select_by,
            options: optionsBy,
            setValue: set_select_by,
          },
          {
            id: 'created',
            value: select_created,
            options: optionsCreated,
            setValue: set_select_created,
            alwaysReload: true,
          },
        ]}
      />
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
                filterType={select_by.value}
                isModuleLink
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
