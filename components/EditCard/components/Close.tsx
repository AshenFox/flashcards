import { MouseEvent, memo } from 'react';
import { useActions } from '@store/hooks';
import { Card } from '@store/reducers/main/mainInitState';
import s from '../styles.module.scss';

type CloseProps = {
  data: Card;
};

const Close = ({ data }: CloseProps) => {
  const { set_card_edit, reset_gallery_fields } = useActions();

  const { _id } = data || {};

  const clickClose = (e: MouseEvent<HTMLDivElement>) => {
    set_card_edit(_id, false);
    reset_gallery_fields(_id);
  };

  return (
    <div className={s.close} onClick={clickClose}>
      <svg width='17' height='17'>
        <use href='../img/sprite.svg#icon__close'></use>
      </svg>
    </div>
  );
};

export default memo(Close);
