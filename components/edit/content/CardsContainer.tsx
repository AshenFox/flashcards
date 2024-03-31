import EditCard from '@components/EditCard';
import ScrollLoading from '../../home/content/ScrollLoading';
import AddCard from './AddCard';
import Save from './Save';
import ContentWrapper from '@components/ContentWrapper';
import { useAppSelector } from '../../../store/hooks';
import { FC } from 'react';

interface OwnProps {}

type Props = OwnProps;

const CardsContainer: FC<Props> = () => {
  const { cards, loading, module } = useAppSelector(({ main }) => main);

  const { draft } = module || {};

  const formatted_cards = Object.values(cards);

  return (
    <ContentWrapper>
      <div className='edit__cards'>
        <div className='container'>
          <div className='edit__cards-container'>
            {formatted_cards.map((card, i, arr) => (
              <EditCard
                key={card._id}
                data={card}
                index={i + 1}
                loading={loading}
                draft={draft}
                number={arr.length}
              />
            ))}
            {loading && <ScrollLoading loading={loading} />}
          </div>
          {!!formatted_cards.length && <AddCard />}
        </div>
      </div>
      {!!formatted_cards.length && <Save />}
    </ContentWrapper>
  );
};

export default CardsContainer;
