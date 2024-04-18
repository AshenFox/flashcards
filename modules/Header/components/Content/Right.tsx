import { useActions } from '@store/hooks';
import { useAppSelector } from '@store/store';
import { useRouter } from 'next/router';
import { MouseEvent, memo, useCallback } from 'react';
import s from './styles.module.scss';
import { getIsDraft, getIsGame } from '@helpers/functions/determinePath';
import Item from './components/Item';
import Hamburger from './components/Hamburger';
import { NewModuleIcon } from '@ui/Icons';

const Right = () => {
  const { change_modal, toggle_modal, set_dropdown, log_out } = useActions();

  const router = useRouter();

  const user = useAppSelector(s => s.auth.user);
  const dropdown_active = useAppSelector(s => s.header.dropdown_active);

  const isDraft = getIsDraft(router.asPath);
  const isGame = getIsGame(router.pathname);

  const activateDropdown = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      set_dropdown(true);
    },
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
            <Item
              href='/edit/draft'
              icon={<NewModuleIcon />}
              className={isGame ? s.hide_max_tablet : s.hide_max_mobile}
            >
              Create new module
            </Item>
          )}

          <Item
            onClick={log_out}
            className={isGame ? s.hide_max_tablet : s.hide_max_mobile}
          >
            Log out
          </Item>

          <Hamburger
            active={dropdown_active}
            onClick={activateDropdown}
            className={isGame ? s.hide_min_tablet : s.hide_min_mobile}
          />
        </>
      ) : (
        <>
          <Item onClick={openModal('log_in')}>Log in</Item>

          <Item onClick={openModal('sign_up')} padded>
            Sign up
          </Item>
        </>
      )}
    </div>
  );
};

export default memo(Right);
