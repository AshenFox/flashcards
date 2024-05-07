import { useRouter } from 'next/router';
import Img from '@ui/Img';
import DateStr from '@ui/DateStr';
import { useAppSelector } from '@store/hooks';
import TextArea from '@ui/TextArea';
import { CloseIcon, TickIcon } from '@ui/Icons';
import { memo } from 'react';

type ResultItemProps = {
  data: {
    id: string;
    answer: false | 'correct' | 'incorrect';
  };
  number: number;
  showHeader?: boolean;
};

const ResultItem = ({ data, number, showHeader = true }: ResultItemProps) => {
  const router = useRouter();
  const { _id } = router.query;

  const isSR = _id === 'sr';

  const cards = useAppSelector(s => s.main.cards);

  const { term, defenition, imgurl, stage, nextRep, prevStage } = cards[data.id] ?? {};

  return (
    <div className='game__finish-body-item'>
      {isSR && showHeader && (
        <div
          //helpers-delete
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
      )}

      <div className='game__finish-body-main'>
        <div className='game__finish-body-left'>
          <div className={`game__finish-icon game__finish-icon--${data.answer}`}>
            {data.answer === 'correct' ? (
              <TickIcon width={20} />
            ) : (
              <CloseIcon width={20} />
            )}
          </div>
          <div className={`game__finish-term game__finish-term--${data.answer}`}>
            <span>{number}.</span>
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

export default memo(ResultItem);
