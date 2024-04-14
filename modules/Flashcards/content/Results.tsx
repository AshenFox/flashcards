import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import ResultsItem from './ResultsItem';
import Link from 'next/link';
import { useAppSelector } from '../../../store/hooks';

interface OwnProps {}

type Props = OwnProps;

const Finish: FC<Props> = () => {
  const router = useRouter();
  const { _id } = router.query;

  const isSR = _id === 'sr';

  const {
    flashcards: { answers },
  } = useAppSelector(({ game }) => game);

  const keyDownFinish = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      router.replace(isSR ? `/home/sr` : `/module/${_id}`);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keyDownFinish);

    return () => {
      window.removeEventListener('keydown', keyDownFinish);
    };
  }, []);

  const correctNum = answers.filter(item => item.answer === 'correct').length;

  return (
    <div className='game__finish'>
      <div className='game__finish-header'>
        <div className='game__finish-header-item'>
          <h1 className='game__finish-title'>Results</h1>
          <h3 className='game__finish-round-stats'>
            {correctNum}/{answers.length} -{' '}
            {Math.round((correctNum / answers.length) * 100)}%
          </h3>
        </div>
        <div className='game__finish-header-item '>
          {' '}
          <Link href={isSR ? `/home/sr` : `/module/${_id}`}>
            <button
              //helpers-delete
              className='bcc-lightblue pad10-30 brr15 white fz15 fw-normal h-grey h-bcc-yellow'
            >
              Finish game
            </button>
          </Link>
        </div>
      </div>

      <div className='game__finish-body'>
        {answers.map((data, i) => (
          <ResultsItem data={data} i={i + 1} key={data.id} />
        ))}
      </div>
    </div>
  );
};

export default Finish;
