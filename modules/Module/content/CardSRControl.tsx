import { FC, MouseEvent, TouchEvent, useRef } from 'react';
import SRIndicator from '@components/SRIndicator';
import { Card } from '../../../store/reducers/main/mainInitState';
import { useActions } from '../../../store/hooks';

interface OwnProps {
  data: Card;
}

type Props = OwnProps;

const CardSRControl: FC<Props> = ({ data }) => {
  const { set_card_sr, set_cards_sr_positive } = useActions();

  const { _id, studyRegime } = data;

  const up = (e: MouseEvent<HTMLLabelElement> | TouchEvent<HTMLLabelElement>) => {
    e.preventDefault();
    clearTimeout(timer.current);

    if (timer.current) {
      set_card_sr(_id, !studyRegime);
    }
  };

  const down = (e: MouseEvent<HTMLLabelElement> | TouchEvent<HTMLLabelElement>) => {
    timer.current = setTimeout(() => {
      timer.current = null;
      if (!studyRegime) set_cards_sr_positive(_id);
    }, 550);
  };

  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  return (
    <div className='module__card-controls-item module__card-study-regime'>
      <input
        className='module__checkbox'
        type='checkbox'
        id={`card_sr_${_id}`}
        checked={studyRegime}
        readOnly
      />
      <SRIndicator data={data} classStr={'module'} />
      <label
        className='module__toggle-switch sm'
        htmlFor={`card_sr_${_id}`}
        onMouseDown={down}
        onMouseUp={up}
        onTouchStart={down}
        onTouchEnd={up}
      />
    </div>
  );
};

export default CardSRControl;
