import { useRouter } from 'next/router';
import Img from '@ui/Img';
import DateStr from '@ui/DateStr';
import { WriteCard } from '@store/reducers/game/gameInitState';
import { FC } from 'react';
import { useAppSelector } from '@store/hooks';
import TextArea from '@ui/TextArea';
import { CloseIcon, TickIcon } from '@ui/Icons';

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
          //helpers-delete
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
            {data.answer === 'correct' ? <TickIcon /> : <CloseIcon />}
          </div>
          <div className={`game__finish-term game__finish-term--${data.answer}`}>
            <span>{i}.</span>
            <TextArea html={term} />
          </div>
        </div>

        <div className='game__finish-body-right'>
          <div className='game__finish-definition'>
            <TextArea html={defenition} />
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
