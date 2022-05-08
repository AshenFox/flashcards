import { FC, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAppSelector } from '../../../store/hooks';

interface OwnProps {
  active: boolean;
}

type Props = OwnProps;

const EndGame: FC<Props> = ({ active }) => {
  const {
    main: { cards },
    game: {
      flashcards: { progress },
    },
  } = useAppSelector((state) => state);

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
    <div className='game__card'>
      <div className={`game__card-front unturnable ${!active ? 'next transparent' : ''}`}>
        <h1 className='game__card-message'>Nice work!</h1>
        <p className='game__card-message-info'>{`You've just studied ${length} term${
          length > 1 ? 's' : ''
        }!`}</p>
        <Link href={`/module/${_id}`}>
          <button className='btn bcc-lightblue pad30 brr15 white fz175 h-grey h-bcc-yellow width50'>
            Finish up
          </button>
        </Link>
      </div>
      <div
        className={`game__card-back unturnable rearside ${
          !active ? 'next transparent' : ''
        }`}
      ></div>
    </div>
  );
};

export default EndGame;
