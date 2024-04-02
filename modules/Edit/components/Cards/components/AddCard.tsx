import { MouseEvent, memo, useCallback } from 'react';
import { useActions } from '@store/hooks';
import s from './styles.module.scss';

const AddCard = () => {
  const { create_card } = useActions();

  const clickAddcard = useCallback(
    (e: MouseEvent<HTMLDivElement>) => create_card(),
    [create_card]
  );

  return (
    <div className={s.addcard} onClick={clickAddcard}>
      <button
        className='btn fz15 uppercase grey h-yellow pad-bot10 br-bottom5 brc-lightblue h-brc-yellow'
        type='button'
      >
        + add card
      </button>
    </div>
  );
};

export default memo(AddCard);