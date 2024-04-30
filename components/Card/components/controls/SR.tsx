import { MouseEvent, TouchEvent, memo, useCallback, useRef } from 'react';
import SRIndicator from '@components/SRIndicator';
import { Card } from '@store/reducers/main/mainInitState';
import { useActions } from '@store/hooks';
import Switch from '@ui/Switch';
import s from './styles.module.scss';
import clsx from 'clsx';

type SRProps = {
  data: Card;
};

const SR = ({ data }: SRProps) => {
  const { set_card_sr, set_cards_sr_positive } = useActions();

  const { _id, studyRegime } = data;

  const up = useCallback(
    (e: MouseEvent<HTMLLabelElement> | TouchEvent<HTMLLabelElement>) => {
      e.preventDefault();
      clearTimeout(timer.current);

      if (timer.current) {
        set_card_sr(_id, !studyRegime);
      }
    },
    [_id, set_card_sr, studyRegime]
  );

  const down = useCallback(
    (e: MouseEvent<HTMLLabelElement> | TouchEvent<HTMLLabelElement>) => {
      timer.current = setTimeout(() => {
        timer.current = null;
        if (!studyRegime) set_cards_sr_positive(_id);
      }, 550);
    },
    [_id, set_cards_sr_positive, studyRegime]
  );

  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  return (
    <Switch
      id={`card_sr_${_id}`}
      className={clsx(s.controls_item, s.sr)}
      active={studyRegime}
      small
      icon={<SRIndicator data={data} small active={studyRegime} />}
      onMouseDown={down}
      onMouseUp={up}
      onTouchStart={down}
      onTouchEnd={up}
    />
  );
};

export default memo(SR);
