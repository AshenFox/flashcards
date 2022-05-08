import { FC, MouseEvent } from 'react';
import { useActions } from '../../../store/hooks';
import { Card } from '../../../store/reducers/main/mainInitState';

interface OwnProps {
  data: Card;
  active: boolean;
}

type Props = OwnProps;

const EditCardDelete: FC<Props> = ({ data, active = false }) => {
  const { delete_card } = useActions();

  const { _id } = data || {};

  const clickCardDelete = (e: MouseEvent<HTMLDivElement>) => active && delete_card(_id);

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
