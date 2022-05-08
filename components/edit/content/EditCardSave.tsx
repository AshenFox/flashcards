import { FC, MouseEvent, TouchEvent, useRef } from 'react';
import { useActions } from '../../../store/hooks';
import { Card } from '../../../store/reducers/main/mainInitState';

interface OwnProps {
  data: Card;
}

type Props = OwnProps;

const EditCardSave: FC<Props> = ({ data }) => {
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
    <div className='edit__save-include'>
      <input
        className='edit__checkbox edit__checkbox--save'
        type='checkbox'
        id={`togglesave${_id}`}
        checked={save}
        readOnly
      />
      <svg height='17' width='17'>
        <use href='../img/sprite.svg#icon__save'></use>
      </svg>
      <span>Save the card</span>
      <label
        className='edit__toggle-switch sm'
        htmlFor={`togglesave${_id}`}
        onMouseDown={down}
        onMouseUp={up}
        onTouchStart={down}
        onTouchEnd={up}
      ></label>
    </div>
  );
};

export default EditCardSave;
