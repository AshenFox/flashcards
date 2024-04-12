import { MouseEvent, memo } from 'react';
import { useActions } from '@store/hooks';
import { Card } from '@store/reducers/main/mainInitState';
import Tooltip, { tooltipContainer } from '@ui/Tooltip';
import clsx from 'clsx';
import s from './styles.module.scss';

type CardSRDropControlProps = {
  data: Card;
};

const CardSRDropControl = ({ data }: CardSRDropControlProps) => {
  const { set_card_question } = useActions();

  const { question, _id } = data;

  const clickDropSR = (e: MouseEvent<HTMLDivElement>) => set_card_question(_id, true);

  return (
    <div
      className={clsx('module__card-controls-item', s.control, tooltipContainer)}
      onClick={clickDropSR}
      data-active={question}
    >
      <svg height='19' width='19'>
        <use href='../img/sprite.svg#icon__drop_studyregime'></use>
      </svg>
      <Tooltip>Drop card study progress</Tooltip>
    </div>
  );
};

export default memo(CardSRDropControl);
