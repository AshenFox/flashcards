import { FC, MouseEvent } from 'react';
import { useActions } from '../../../store/hooks';
import { Card } from '../../../store/reducers/main/mainInitState';

interface OwnProps {
  data: Card;
}

type Props = OwnProps;

const EditCardClose: FC<Props> = ({ data }) => {
  const { set_card_edit, reset_gallery_fields } = useActions();

  const { _id } = data || {};

  const clickClose = (e: MouseEvent<HTMLDivElement>) => {
    set_card_edit(_id, false);
    reset_gallery_fields(_id);
  };

  return (
    <div className='edit__cards-close' onClick={clickClose}>
      <svg width='17' height='17'>
        <use href='../img/sprite.svg#icon__close'></use>
      </svg>
    </div>
  );
};

export default EditCardClose;
