import { FC, MouseEvent } from 'react';
import { set_card_edit, reset_gallery_fields } from '../../../store/actions/editActions';
import { Card } from '../../../store/reducers/main/mainInitState';
import { useAppDispatch } from '../../../store/store';

interface OwnProps {
  data: Card;
}

type Props = OwnProps;

const EditCardClose: FC<Props> = ({ data }) => {
  const dispatch = useAppDispatch();

  const { _id } = data || {};

  const clickClose = (e: MouseEvent<HTMLDivElement>) => {
    dispatch(set_card_edit(_id, false));
    dispatch(reset_gallery_fields(_id));
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
