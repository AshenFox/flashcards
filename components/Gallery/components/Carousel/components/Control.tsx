import { MouseEvent, memo, useCallback } from 'react';
import { useActions, useAppSelector } from '@store/hooks';
import { clsx } from 'clsx';
import s from '../styles.module.scss';

type ControlProps = {
  direction: 'left' | 'right';
  _id: string;
};

const Control = ({ direction, _id }: ControlProps) => {
  const { move_gallery } = useActions();

  const cards = useAppSelector(s => s.main.cards);

  const card = cards[_id];
  const { position = 0, width = 0 } = card?.gallery ?? {};

  let active = true;

  const clickControl = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (active) move_gallery(_id, direction);
    },
    [_id, active, direction, move_gallery]
  );

  if (direction === 'left') {
    if (Math.abs(position) <= 0) active = false;
  }

  if (direction === 'right') {
    const innerWidth = window.innerWidth;
    let windowWidth = 0;

    if (innerWidth < 600) windowWidth = 17;
    if (innerWidth > 600) windowWidth = 34;
    if (innerWidth > 800) windowWidth = 51;
    if (innerWidth > 1000) windowWidth = 68;

    const sum = Math.abs(position) + windowWidth;

    if (sum >= width) active = false;
  }

  return (
    <div
      className={clsx(s.control, s[direction])}
      data-control_el='true'
      data-active={active}
      onClick={clickControl}
    >
      <button
        //helpers-delete
        className={clsx(
          'pad15 bcc-white brr50p d-f h-bcc-yellow p-r',
          direction === 'left' ? 'mar-left-a' : ''
        )}
      >
        <svg>
          <use href={`../img/sprite.svg#icon__triangle_${direction}`}></use>
        </svg>
      </button>
    </div>
  );
};

export default memo(Control);
