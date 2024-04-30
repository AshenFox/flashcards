import { MouseEvent, memo } from 'react';
import { useActions } from '@store/hooks';
import { Card } from '@store/reducers/main/mainInitState';
import { EditIcon } from '@ui/Icons';
import s from './styles.module.scss';
import clsx from 'clsx';

type EditProps = {
  data: Card;
};

const Edit = ({ data }: EditProps) => {
  const { set_card_edit } = useActions();

  const { _id } = data;

  const clickEdit = (e: MouseEvent<HTMLDivElement>) => set_card_edit(_id, true);

  return (
    <div className={clsx(s.controls_item, s.edit)} onClick={clickEdit}>
      <EditIcon width='19' height='19' />
    </div>
  );
};

export default memo(Edit);
