import { FC, MouseEvent, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { set_game_controls_dimen } from '../../../store/actions/dimenActions';
import { prepare_write } from '../../../store/actions/gameActions';
import Progress from './Progress';
import Link from 'next/link';
import { useAppDispatch } from '../../../store/store';

interface OwnProps {}

type Props = OwnProps;

const Controls: FC<Props> = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const { _id } = router.query;

  const isSR = _id === 'sr';

  const clickStartOver = (e: MouseEvent<HTMLButtonElement>) => dispatch(prepare_write());

  const onSizeChange = (e: UIEvent) => {
    dispatch(set_game_controls_dimen(controllsEl.current));
  };

  useEffect(() => {
    dispatch(set_game_controls_dimen(controllsEl.current));
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
              <button className='btn grey ai-c ta-l fz17 width100 pad15-20 h-bcc-yellow'>
                <svg height='15' width='15'>
                  <use href='../img/sprite.svg#icon__triangle_left'></use>
                </svg>
                <span>Back</span>
              </button>
            </Link>
          </div>

          <div className='game__title'>
            <svg height='40' width='40'>
              <use href='../img/sprite.svg#icon__write'></use>
            </svg>
            <span>Write</span>
          </div>

          <Progress />

          <div className='game__control-buttons'>
            {!isSR && (
              <div className='game__startover'>
                <button
                  className='btn width100 fz15 pad7 br2 brc-grey-medium brr15 lightblue h-red h-brc-red'
                  onClick={clickStartOver}
                >
                  <span>Start over</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
