import { useActions } from '@store/hooks';
import { useAppSelector } from '@store/store';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MouseEvent, memo, useCallback } from 'react';
import s from './styles.module.scss';
import clsx from 'clsx';
import { getIsDraft, getIsGame } from '@helpers/functions/determinePath';

const Right = () => {
  const { change_modal, toggle_modal, set_dropdown, log_out } = useActions();

  const router = useRouter();

  const user = useAppSelector(s => s.auth.user);
  const dropdown_active = useAppSelector(s => s.header.dropdown_active);

  const isDraft = getIsDraft(router.asPath);
  const isGame = getIsGame(router.pathname);

  const activateDropdown = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => set_dropdown(true),
    [set_dropdown]
  );

  const openModal = useCallback(
    (value: 'log_in' | 'sign_up') => (e: MouseEvent<HTMLButtonElement>) => {
      change_modal(value);
      toggle_modal();
    },
    [change_modal, toggle_modal]
  );

  return (
    <div className={s.right}>
      {user ? (
        <>
          {!isDraft && (
            <Link href='/edit/draft'>
              <button
                className={clsx(
                  'white fz175 h-primary-pale',
                  isGame ? 'hidden__media-tablet' : 'hidden__media-mobile'
                )}
              >
                <svg width='20' height='20'>
                  <use href='../img/sprite.svg#icon__new_module'></use>
                </svg>
                Create new module
              </button>
            </Link>
          )}

          <button
            className={clsx(
              'white fz175 h-primary-pale',
              isGame ? 'hidden__media-tablet' : 'hidden__media-mobile'
            )}
            onClick={log_out}
          >
            Log out
          </button>

          <button
            className={clsx(
              s.hamburger,
              s.spring,
              isGame ? s.hide_tablet : s.hide_mobile,
              dropdown_active ? s.active : ''
            )}
            type='button'
            onClick={!dropdown_active && activateDropdown}
          >
            <span className={s.hamburger_box}>
              <span className={s.hamburger_inner}></span>
            </span>
          </button>
        </>
      ) : (
        <>
          <button onClick={openModal('log_in')} className='white fz175 h-primary-pale'>
            Log in
          </button>

          <button
            onClick={openModal('sign_up')}
            className='bcc-lightblue pad15-30 brr15 white fz175 h-grey h-bcc-yellow'
          >
            Sign up
          </button>
        </>
      )}
    </div>
  );
};

export default memo(Right);
