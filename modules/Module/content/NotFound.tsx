import { FC, ReactNode } from 'react';
import { useAppSelector } from '../../../store/hooks';

interface OwnProps {}

type Props = OwnProps;

const NotFound: FC<Props> = () => {
  const { cards, search_cards } = useAppSelector(({ main }) => main);

  let content: ReactNode;

  const cardsArr = Object.values(cards);

  if (!cardsArr.length)
    content = (
      <p>
        No cards matching <b>{`"${search_cards.value}"`}</b> found.
      </p>
    );

  return <div className='module__none-found'>{content}</div>;
};

export default NotFound;
