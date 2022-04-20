import { FC, MouseEvent } from 'react';
import { delete_card } from '../../../store/actions/editActions';
import { Card } from '../../../store/reducers/main/mainInitState';
import { useAppDispatch } from '../../../store/store';

interface OwnProps {
  data: Card;
  active: boolean;
}

type Props = OwnProps;

const EditCardDelete: FC<Props> = ({ data, active = false }) => {
  const dispatch = useAppDispatch();

  const { _id } = data;

  const clickCardDelete = (e: MouseEvent<HTMLDivElement>) =>
    active && dispatch(delete_card(_id));

  return (
    <div
      className={`edit__cards-delete ${active ? '' : 'edit__cards-delete--inactive'}`}
      onClick={clickCardDelete}
    >
      <svg width='17' height='17'>
        <use href='../img/sprite.svg#icon__delete'></use>
      </svg>
    </div>
  );
};

export default EditCardDelete;
