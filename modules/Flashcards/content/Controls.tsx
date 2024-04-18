import { useRouter } from 'next/router';
import { FC, useEffect, useRef } from 'react';
import Link from 'next/link';
import Progress from './Progress';
import ShuffleBtn from './ShuffleBtn';
import { useActions } from '../../../store/hooks';
import { CardsIcon, TriangleLeftIcon } from '@ui/Icons';

interface OwnProps {}

type Props = OwnProps;

const Controls: FC<Props> = () => {
  const { set_game_controls_dimen } = useActions();

  const router = useRouter();
  const { _id } = router.query;

  const isSR = _id === 'sr';

  const onSizeChange = (e: UIEvent | Event) =>
    set_game_controls_dimen(controllsEl.current);

  useEffect(() => {
    set_game_controls_dimen(controllsEl.current);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onSizeChange);
    window.addEventListener('orientationchange', onSizeChange);
    return () => {
      window.removeEventListener('resize', onSizeChange);
      window.removeEventListener('orientationchange', onSizeChange);
    };
  }, []);

  const controllsEl = useRef<HTMLDivElement>(null);

  return (
    <div className='game__container'>
      <div className='game__controls-container' ref={controllsEl}>
        <div className='game__controls'>
          <div className='game__back'>
            <Link href={isSR ? '/home/sr' : `/module/${_id}`}>
              <button
                //helpers-delete
                className='grey ai-c ta-l fz17 width100 pad15-20 h-bcc-yellow'
              >
                {' '}
                <TriangleLeftIcon height='15' width='15' />
                <span>Back</span>
              </button>
            </Link>
          </div>

          <div className='game__title'>
            <CardsIcon height='40' width='40' />
            <span>Flashcards</span>
          </div>

          <Progress />

          <div className='game__control-buttons '>{!isSR && <ShuffleBtn />}</div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
