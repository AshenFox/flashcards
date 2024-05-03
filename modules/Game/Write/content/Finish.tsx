import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import FinishItem from './FinishItem';
import Link from 'next/link';
import { useActions, useAppSelector } from '@store/hooks';

interface OwnProps {}

type Props = OwnProps;

const Finish: FC<Props> = () => {
  const { next_write_round } = useActions();

  const router = useRouter();
  const { _id } = router.query;

  const isSR = _id === 'sr';

  const {
    write: { rounds, all_cards_num },
  } = useAppSelector(({ game }) => game);

  const keyDownFinish = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      router.replace(isSR ? '/home/sr' : `/module/${_id}`);
    }
  };

  useEffect(() => {
    if (all_cards_num) next_write_round();

    window.addEventListener('keydown', keyDownFinish);

    return () => {
      window.removeEventListener('keydown', keyDownFinish);
    };
  }, []);

  return (
    <>
      {rounds.map((round, i) => {
        const correctNum = round.filter(item => item.answer === 'correct').length;

        return (
          <div className='game__finish' key={i}>
            <div className='game__finish-header'>
              <div className='game__finish-header-item'>
                <h1 className='game__finish-title'>Round {i + 1}</h1>
                <h3 className='game__finish-round-stats'>
                  {correctNum}/{round.length} -{' '}
                  {Math.round((correctNum / round.length) * 100)}%
                </h3>
              </div>

              <div
                //helpers-delete
                className={`game__finish-header-item ${i !== 0 ? 'hidden' : ''}`}
              >
                {' '}
                <Link href={isSR ? '/home/sr' : `/module/${_id}`}>
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
              {round.map((data, z) => (
                <FinishItem data={data} i={z + 1} key={data.id} stats={i === 0} />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Finish;
