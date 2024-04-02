import Link from 'next/link';
import SrInTime from './SrInTime';
import SrCounter from './SrCounter';
import Skeleton from 'react-loading-skeleton';
import { useAppSelector } from '../../../store/hooks';
import { FC } from 'react';

interface OwnProps {}

type Props = OwnProps;

const StudyRegime: FC<Props> = () => {
  const {
    sr: { all_num, repeat_num, counter },
    main: { loading },
  } = useAppSelector((state) => state);

  return (
    <div className='home__module home__module--v2'>
      <div className='home__module-container'>
        <div className='home__module-title home__module-title--v2'>Study Regime</div>
        <ul className='home__study-regime-info'>
          <li>
            <span>
              {loading ? <Skeleton width={25} /> : all_num} card
              {all_num > 1 || all_num < 1 ? 's' : ''}
            </span>{' '}
            in the regime.
          </li>
          <li>
            <SrInTime />
          </li>
        </ul>
      </div>

      <div className='home__repeat'>
        <p>
          Currently you have{' '}
          <span>
            {loading ? <Skeleton width={30} /> : repeat_num} card
            {repeat_num > 1 || repeat_num < 1 ? 's' : ''}
          </span>{' '}
          to repeat.
        </p>
        {!!repeat_num && (
          <>
            <p className=''>Repeat with:</p>
            <div className='home__repeat-methods'>
              <SrCounter />
              <Link href={'/flashcards/sr' + (counter ? `?number=${counter}` : '')}>
                <div className='home__repeat-item'>
                  <svg height='35' width='35'>
                    <use href='../img/sprite.svg#icon__cards'></use>
                  </svg>
                </div>
              </Link>
              <Link href={'/write/sr' + (counter ? `?number=${counter}` : '')}>
                <div className='home__repeat-item'>
                  <svg height='35' width='35'>
                    <use href='../img/sprite.svg#icon__write'></use>
                  </svg>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudyRegime;
