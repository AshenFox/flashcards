import EditCard from '@components/EditCard';
import NotFound from './NotFound';
import ScrollLoader from '@ui/ScrollLoader';
import { useAppSelector } from '@store/hooks';
import { FC } from 'react';
import Card from '@components/Card';

interface OwnProps {}

type Props = OwnProps;

const CardsContainer: FC<Props> = () => {
  const { cards, loading, search_cards, select_by } = useAppSelector(({ main }) => main);

  const formatted_cards = Object.values(cards);

  return (
    <div className='module__card-cont'>
      {formatted_cards.map(card =>
        card.edit ? (
          <EditCard key={card._id} data={card} toggle={true} loading={loading} />
        ) : (
          <Card
            key={card._id}
            data={card}
            filter={search_cards.value}
            filterType={select_by.value}
          />
        )
      )}
      {loading && <ScrollLoader active={loading} />}
      {!loading && <NotFound />}
    </div>
  );
};

export default CardsContainer;
