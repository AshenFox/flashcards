import { MouseEvent, TouchEvent, memo, useCallback, useRef } from 'react';
import { useActions } from '@store/hooks';
import { Card } from '@store/reducers/main/mainInitState';
import s from './styles.module.scss';
import Switch from '@ui/Switch';

type SaveProps = {
  data: Card;
};

const Save = ({ data }: SaveProps) => {
  const { set_card_save, set_cards_save_positive } = useActions();

  const { _id, save } = data;

  const up = useCallback(
    (e: MouseEvent<HTMLLabelElement> | TouchEvent<HTMLLabelElement>) => {
      e.preventDefault();
      clearTimeout(timer.current);

      if (timer.current) {
        set_card_save(_id, !save);
      }
    },
    [_id, save, set_card_save]
  );

  const down = useCallback(
    (e: MouseEvent<HTMLLabelElement> | TouchEvent<HTMLLabelElement>) => {
      timer.current = setTimeout(() => {
        timer.current = null;
        if (!save) set_cards_save_positive(_id);
      }, 550);
    },
    [_id, save, set_cards_save_positive]
  );

  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  return (
    <Switch
      id={`switch-save${_id}`}
      className={s.save}
      active={save}
      small
      icon={'icon__save'}
      tooltip='Save the card'
      onMouseDown={down}
      onMouseUp={up}
      onTouchStart={down}
      onTouchEnd={up}
    />
  );
};

export default memo(Save);
