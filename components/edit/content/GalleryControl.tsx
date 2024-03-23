import { FC, MouseEvent } from 'react';
import { useActions, useAppSelector } from '../../../store/hooks';

interface OwnProps {
  direction: 'left' | 'right';
  _id: string;
}

type Props = OwnProps;

const GalleryControl: FC<Props> = ({ direction, _id }) => {
  const { move_gallery } = useActions();

  const { cards } = useAppSelector(({ main }) => main);

  const card = cards[_id];
  const { position = 0, width = 0 } = card?.gallery ?? {};

  const clickControl = (e: MouseEvent<HTMLDivElement>) => {
    if (active) move_gallery(_id, direction);
  };

  let active = true;

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
      className={`edit__gallery-control--${direction}`}
      data-control_el='true'
      data-active={active}
      onClick={clickControl}
    >
      <button
        className={`btn pad15 bcc-white brr50p d-f h-bcc-yellow p-r ${
          direction === 'left' ? 'mar-left-a' : ''
        }`}
      >
        <svg>
          <use href={`../img/sprite.svg#icon__triangle_${direction}`}></use>
        </svg>
      </button>
    </div>
  );
};

export default GalleryControl;
