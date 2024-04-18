import { useRouter } from 'next/router';
import Link from 'next/link';
import { FC } from 'react';
import { CardsIcon, WriteIcon } from '@ui/Icons';

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
          <button>
            <CardsIcon height='31' width='31' />
            <span>Flashcards</span>
          </button>
        </Link>
      </div>

      <div className='module__study-item' id='write-game'>
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

export default Study;
