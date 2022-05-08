import { FC, MouseEvent } from 'react';
import { useActions } from '../../../store/hooks';
import { Card } from '../../../store/reducers/main/mainInitState';

interface OwnProps {
  data: Card;
}

type Props = OwnProps;

const CardSRDropControl: FC<Props> = ({ data }) => {
  const { set_card_question } = useActions();

  const { question, _id } = data;

  const clickDropSR = (e: MouseEvent<HTMLDivElement>) => set_card_question(_id, true);

  return (
    <div
      className='module__card-controls-item module__drop-card-study-regime'
      onClick={clickDropSR}
      data-active={question}
    >
      <svg height='19' width='19'>
        <use href='../img/sprite.svg#icon__drop_studyregime'></use>
      </svg>
      <span>Drop card study progress</span>
    </div>
  );
};

export default CardSRDropControl;
