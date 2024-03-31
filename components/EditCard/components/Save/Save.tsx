import { MouseEvent, TouchEvent, memo, useRef } from 'react';
import { useActions } from '@store/hooks';
import { Card } from '@store/reducers/main/mainInitState';
import s from './styles.module.scss';
import clsx from 'clsx';

type SaveProps = {
  data: Card;
};

const Save = ({ data }: SaveProps) => {
  const { set_card_save, set_cards_save_positive } = useActions();

  const { _id, save } = data;

  const up = (e: MouseEvent<HTMLLabelElement> | TouchEvent<HTMLLabelElement>) => {
    e.preventDefault();
    clearTimeout(timer.current);

    if (timer.current) {
      set_card_save(_id, !save);
    }
  };

  const down = (e: MouseEvent<HTMLLabelElement> | TouchEvent<HTMLLabelElement>) => {
    timer.current = setTimeout(() => {
      timer.current = null;
      if (!save) set_cards_save_positive(_id);
    }, 550);
  };

  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  return (
    <div className={s.save}>
      <input
        className={clsx(s.checkbox, s.save)}
        type='checkbox'
        id={`toggle-save${_id}`}
        checked={save}
        readOnly
      />
      <svg height='17' width='17'>
        <use href='../img/sprite.svg#icon__save'></use>
      </svg>
      <span>Save the card</span>
      <label
        className={clsx(s.toggle)}
        htmlFor={`toggle-save${_id}`}
        onMouseDown={down}
        onMouseUp={up}
        onTouchStart={down}
        onTouchEnd={up}
      ></label>
    </div>
  );
};

export default memo(Save);
