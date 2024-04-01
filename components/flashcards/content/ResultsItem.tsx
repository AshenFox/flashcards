import ContentEditable from 'react-contenteditable';
import Img from '@ui/Img';
import DateStr from '@ui/DateStr';
import { useAppSelector } from '../../../store/hooks';
import { FC } from 'react';
import { FlashcardsAnswer } from '../../../store/reducers/game/gameInitState';

interface OwnProps {
  data: FlashcardsAnswer;
  i: number;
}

type Props = OwnProps;

const FinishItem: FC<Props> = ({ data, i }) => {
  const { cards } = useAppSelector(({ main }) => main);

  const { term, defenition, imgurl, stage, nextRep, prevStage } = cards[data.id];

  return (
    <div className='game__finish-body-item'>
      <div
        className={`game__finish-body-header game__finish-body-header--${data.answer}`}
      >
        <p>SR Stage: {stage}</p>
        <p>
          Next repeat: <DateStr date={nextRep} />
        </p>
        <p>
          Drop stage: <DateStr date={prevStage} />
        </p>
      </div>
      <div className='game__finish-body-main'>
        <div className='game__finish-body-left'>
          <div className={`game__finish-icon game__finish-icon--${data.answer}`}>
            <svg height='22' width='22'>
              <use
                href={`../img/sprite.svg#icon__${
                  data.answer === 'correct' ? 'tick' : 'close'
                }`}
              ></use>
            </svg>
          </div>
          <div className={`game__finish-term game__finish-term--${data.answer}`}>
            <span>{i}.</span>
            <ContentEditable html={term} disabled={true} onChange={null} />
          </div>
        </div>

        <div className='game__finish-body-right'>
          <div className='game__finish-definition'>
            <ContentEditable html={defenition} disabled={true} onChange={null} />
            <Img
              containerClass={'game__finish-img-container'}
              imgClass={'game__finish-img'}
              url={imgurl}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishItem;
