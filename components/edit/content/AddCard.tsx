import { FC, MouseEvent } from 'react';
import { useActions } from '../../../store/hooks';

interface OwnProps {}

type Props = OwnProps;

const AddCard: FC<Props> = () => {
  const { create_card } = useActions();

  const clickAddcard = (e: MouseEvent<HTMLDivElement>) => create_card();

  return (
    <div className='edit__cards-addcard' onClick={clickAddcard}>
      <button
        className='btn fz15 uppercase grey h-yellow pad-bot10 br-bottom5 brc-lightblue h-brc-yellow'
        type='button'
      >
        + add card
      </button>
    </div>
  );
};

export default AddCard;
