import { useAppSelector } from '@store/store';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo } from 'react';
import s from './styles.module.scss';
import clsx from 'clsx';
import { getIsGame, getIsSR } from '@helpers/functions/determinePath';

const Left = () => {
  const router = useRouter();
  const { _id } = router.query;

  const isSR = getIsSR(_id);
  const isGame = getIsGame(router.pathname);

  const user = useAppSelector(s => s.auth.user);
  const header_width = useAppSelector(s => s.dimen.header_width);
  const loading = useAppSelector(s => s.auth.loading);

  return (
    <div className={s.left}>
      {!loading && (
        <>
          <a className={s.title_link} href={user ? '/home/modules' : '/'}>
            <h1 className={clsx(s.title, isGame && s.hidden)}>
              {header_width > 620 ? 'Flash Cards' : 'FC'}
            </h1>
          </a>
          {user && isGame && (
            <Link href={isSR ? '/home/sr' : `/module/${_id}`}>
              <div className={clsx(s.btn, s.back)}>
                <button className='d-f h-primary-pale'>
                  <svg width='25' height='25'>
                    <use href='../img/sprite.svg#icon__game_back'></use>
                  </svg>
                </button>
              </div>
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default memo(Left);
