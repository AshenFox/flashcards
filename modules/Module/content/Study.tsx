import { useRouter } from 'next/router';
import Link from 'next/link';
import { FC } from 'react';

interface OwnProps {}

type Props = OwnProps;

const Study: FC<Props> = () => {
  const router = useRouter();
  const { _id } = router.query;

  return (
    <div className='module__study'>
      <div className='module__study-title'>STUDY:</div>

      <div className='module__study-item' id='write-game'>
        <Link href={`/flashcards/${_id}`}>
          <button className='btn'>
            <svg height='31' width='31'>
              <use href='../img/sprite.svg#icon__cards'></use>
            </svg>
            <span>Flashcards</span>
          </button>
        </Link>
      </div>

      <div className='module__study-item' id='write-game'>
        <Link href={`/write/${_id}`}>
          <button className='btn'>
            <svg height='30' width='30'>
              <use href='../img/sprite.svg#icon__write'></use>
            </svg>
            <span>Write</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Study;
