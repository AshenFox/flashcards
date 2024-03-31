import { MouseEvent, memo } from 'react';
import { useActions } from '@store/hooks';
import { Card } from '@store/reducers/main/mainInitState';
import s from '../styles.module.scss';
import clsx from 'clsx';

type DeleteProps = {
  data: Card;
  active: boolean;
};

const Delete = ({ data, active = false }: DeleteProps) => {
  const { delete_card } = useActions();

  const { _id } = data || {};

  const clickCardDelete = (e: MouseEvent<HTMLDivElement>) => active && delete_card(_id);

  return (
    <div className={clsx(s.delete, !active && s.inactive)} onClick={clickCardDelete}>
      <svg width='17' height='17'>
        <use href='../img/sprite.svg#icon__delete'></use>
      </svg>
    </div>
  );
};

export default memo(Delete);
