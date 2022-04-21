import { useRouter } from 'next/router';
import ContentEditable from 'react-contenteditable';
import Img from '../../main/Img';
import DateStr from '../../main/DateSrt';
import { WriteCard } from '../../../store/reducers/game/gameInitState';
import { FC } from 'react';
import { useAppSelector } from '../../../store/store';

interface OwnProps {
  data: WriteCard;
  i: number;
  stats?: boolean;
}

type Props = OwnProps;

const FinishItem: FC<Props> = ({ data, i, stats }) => {
  const router = useRouter();
  const { _id } = router.query;

  const isSR = _id === 'sr';

  const { cards } = useAppSelector(({ main }) => main);

  const { term, defenition, imgurl, stage, nextRep, prevStage } = cards[data.id];

  return (
    <div className='game__finish-body-item'>
      {isSR && (
        <div
          className={`game__finish-body-header game__finish-body-header--${data.answer} ${
            stats ? '' : 'hidden'
          }`}
        >
          <p>SR Stage: {stage}</p>
          <p>
            Next repeat: <DateStr date={nextRep} />
          </p>
          <p>
            Drop stage: <DateStr date={prevStage} />
          </p>
        </div>
      )}

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
