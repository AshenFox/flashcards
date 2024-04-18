import { FC, MouseEvent } from 'react';
import { useActions } from '../../../store/hooks';
import { Card } from '../../../store/reducers/main/mainInitState';
import { EditIcon } from '@ui/Icons';

interface OwnProps {
  data: Card;
}

type Props = OwnProps;

const CardEditControl: FC<Props> = ({ data }) => {
  const { set_card_edit } = useActions();

  const { _id } = data;

  const clickEdit = (e: MouseEvent<HTMLDivElement>) => set_card_edit(_id, true);

  return (
    <div className='module__card-controls-item module__edit-card' onClick={clickEdit}>
      <EditIcon width='19' height='19' />
    </div>
  );
};

export default CardEditControl;
