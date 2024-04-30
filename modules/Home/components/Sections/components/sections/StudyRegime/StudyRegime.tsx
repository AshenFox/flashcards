import Link from 'next/link';
import InTime from './components/InTime';
import SrCounter from './components/Counter/Counter';
import Skeleton from 'react-loading-skeleton';
import { useAppSelector } from '@store/hooks';
import { FC, memo } from 'react';
import { CardsIcon, WriteIcon } from '@ui/Icons';
import s from './styles.module.scss';

interface OwnProps {}

type Props = OwnProps;

const StudyRegime: FC<Props> = () => {
  const {
    sr: { all_num, repeat_num, counter },
    main: { loading },
  } = useAppSelector(state => state);

  return (
    <div className={s.study_regime}>
      <div className={s.description}>
        <div className={s.title}>Study Regime</div>
        <ul className={s.info}>
          <li>
            <span>
              {loading ? <Skeleton width={25} /> : all_num} card
              {all_num > 1 || all_num < 1 ? 's' : ''}
            </span>{' '}
            in the regime.
          </li>
          <li>
            <InTime />
          </li>
        </ul>
      </div>

      <div className={s.repeat}>
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
            <p>Repeat with:</p>
            <div className={s.methods}>
              <SrCounter />
              <Link href={'/flashcards/sr' + (counter ? `?number=${counter}` : '')}>
                <div className={s.item}>
                  <CardsIcon height='35' width='35' />
                </div>
              </Link>
              <Link href={'/write/sr' + (counter ? `?number=${counter}` : '')}>
                <div className={s.item}>
                  <WriteIcon height='35' width='35' />
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(StudyRegime);