import { ReactNode, memo, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

type ResultsProps = {
  title: string;
  progress: number;
  all: number;
  showLink?: boolean;
  children?: ReactNode;
};

const Results = ({ title, progress, all, showLink = true, children }: ResultsProps) => {
  const router = useRouter();
  const { _id } = router.query;

  const isSR = _id === 'sr';

  useEffect(() => {
    const keyDownFinish = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        router.replace(isSR ? '/home/sr' : `/module/${_id}`);
      }
    };

    window.addEventListener('keydown', keyDownFinish);

    return () => {
      window.removeEventListener('keydown', keyDownFinish);
    };
  }, [_id, isSR, router]);

  return (
    <div className='game__finish'>
      <div className='game__finish-header'>
        <div className='game__finish-header-item'>
          <h1 className='game__finish-title'>{title}</h1>
          <h3 className='game__finish-round-stats'>
            {progress}/{all} - {Math.round((progress / all) * 100)}%
          </h3>
        </div>

        {showLink && (
          <div className={`game__finish-header-item`}>
            <Link href={isSR ? '/home/sr' : `/module/${_id}`}>
              <button
                //helpers-delete
                className='bcc-lightblue pad10-30 brr15 white fz15 fw-normal h-grey h-bcc-yellow'
              >
                Finish game
              </button>
            </Link>
          </div>
        )}
      </div>

      <div className='game__finish-body'>{children}</div>
    </div>
  );
};

export default memo(Results);
