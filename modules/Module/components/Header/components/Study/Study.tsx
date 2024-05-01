import { useRouter } from 'next/router';
import Link from 'next/link';
import { CardsIcon, WriteIcon } from '@ui/Icons';
import { memo } from 'react';
import s from './styles.module.scss';

const Study = () => {
  const router = useRouter();
  const { _id } = router.query;

  return (
    <div className={s.study}>
      <div className={s.title}>STUDY:</div>

      <div className={s.item} id='flashcards-game'>
        <Link href={`/flashcards/${_id}`}>
          <button>
            <CardsIcon height='31' width='31' />
            <span>Flashcards</span>
          </button>
        </Link>
      </div>

      <div className={s.item} id='write-game'>
        <Link href={`/write/${_id}`}>
          <button>
            <WriteIcon height='30' width='30' />
            <span>Write</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default memo(Study);
