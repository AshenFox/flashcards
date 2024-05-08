import { memo, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAppSelector } from '@store/hooks';
import s from './styles.module.scss';
import clsx from 'clsx';

type EndGameProps = {
  active: boolean;
};

const EndGame = ({ active }: EndGameProps) => {
  const cards = useAppSelector(s => s.main.cards);
  const progress = useAppSelector(s => s.game.flashcards.progress);

  const router = useRouter();

  const { _id } = router.query;

  const cardsArr = Object.values(cards);
  const { length } = cardsArr;

  const isEnd = length === progress;

  const isEndRef = useRef(isEnd);
  isEndRef.current = isEnd;

  const keyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && isEndRef.current) {
      router.replace(`/module/${_id}`);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keyDown);

    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  }, []);

  return (
    <div className={clsx(s.card, !isEnd && s.transparent)}>
      <div className={clsx(s.front, s.unmovable, !active && clsx(s.next, s.transparent))}>
        <h1 className={s.message}>Nice work!</h1>
        <p className={s.message_info}>{`You've just studied ${length} term${
          length > 1 ? 's' : ''
        }!`}</p>
        <Link href={`/module/${_id}`}>
          <button
            //helpers-delete
            className='bcc-lightblue pad30 brr15 white fz175 h-grey h-bcc-yellow width50'
          >
            Finish up
          </button>
        </Link>
      </div>
      <div
        className={clsx(
          s.back,
          s.unmovable,
          s.rear_side,
          !active && clsx(s.next, s.transparent)
        )}
      ></div>
    </div>
  );
};

export default memo(EndGame);