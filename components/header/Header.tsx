import { FC, MouseEvent, ReactNode, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Dropdown from './content/Dropdown';
import ContentWrapper from '@components/ContentWrapper';
import { useActions, useAppSelector } from '../../store/hooks';
import Container from '@components/Container';

interface OwnProps {}

type Props = OwnProps;

const Header: FC<Props> = () => {
  const { change_modal, toggle_modal, set_dropdown, log_out, set_header_dimen } =
    useActions();

  const openModal =
    (value: 'log_in' | 'sign_up') => (e: MouseEvent<HTMLButtonElement>) => {
      change_modal(value);
      toggle_modal();
    };

  const {
    auth: { user, loading },
    dimen: { header_width },
    header: { dropdown_active },
  } = useAppSelector(state => state);

  const router = useRouter();
  const { _id } = router.query;

  const isSR = _id === 'sr';

  const activateDropdown = (e: MouseEvent<HTMLButtonElement>) => set_dropdown(true);

  const onSizeChange = (e: UIEvent) => set_header_dimen(headerEl.current);
  const onSizeChangeDelayed = (e: Event) =>
    setTimeout(() => set_header_dimen(headerEl.current), 200);

  useEffect(() => {
    window.addEventListener('resize', onSizeChange);
    window.addEventListener('orientationchange', onSizeChangeDelayed);

    return () => {
      window.removeEventListener('resize', onSizeChange);
      window.removeEventListener('orientationchange', onSizeChangeDelayed);
    };
  }, []);

  useEffect(() => {
    set_header_dimen(headerEl.current);
  }, [user, loading]);

  const headerEl = useRef<HTMLElement>(null);

  const isGame =
    router.pathname === '/flashcards/[_id]' || router.pathname === '/write/[_id]'
      ? true
      : false;

  const buttonsRight: ReactNode = user ? (
    <>
      {router.asPath !== '/edit/draft' && (
        <Link href='/edit/draft'>
          <button
            className={`btn white fz175 h-primary-pale ${
              isGame ? 'hidden__media-tablet' : 'hidden__media-mobile'
            }`}
          >
            <svg width='20' height='20'>
              <use href='../img/sprite.svg#icon__new_module'></use>
            </svg>
            Create new module
          </button>
        </Link>
      )}

      <button
        className={`btn white fz175 h-primary-pale ${
          isGame ? 'hidden__media-tablet' : 'hidden__media-mobile'
        }`}
        onClick={log_out}
      >
        Log out
      </button>

      <button
        className={`btn header__hamburger header__hamburger--spring ${
          isGame ? 'hidden__media-min-tablet' : 'hidden__media-min-mobile'
        } ${dropdown_active ? 'active' : ''}`}
        type='button'
        onClick={!dropdown_active ? activateDropdown : () => {}}
      >
        <span className='header__hamburger-box'>
          <span className='header__hamburger-inner'></span>
        </span>
      </button>
    </>
  ) : (
    <>
      <button onClick={openModal('log_in')} className='btn white fz175 h-primary-pale'>
        Log in
      </button>

      <button
        onClick={openModal('sign_up')}
        className='btn bcc-lightblue pad15-30 brr15 white fz175 h-grey h-bcc-yellow'
      >
        Sign up
      </button>
    </>
  );

  const buttonsLeft: ReactNode = (
    <>
      <a className='header__title-link' href={user ? '/home/modules' : '/'}>
        <h1 className={`header__title ${isGame ? 'hidden__media-tablet' : ''}`}>
          {header_width > 620 ? 'Flash Cards' : 'FC'}
        </h1>
      </a>
      {user && isGame && (
        <Link href={isSR ? '/home/sr' : `/module/${_id}`}>
          <div className='header__button header__button--back'>
            <button className='btn d-f h-primary-pale'>
              <svg width='25' height='25'>
                <use href='../img/sprite.svg#icon__game_back'></use>
              </svg>
            </button>
          </div>
        </Link>
      )}
    </>
  );

  return (
    <>
      <header className='header' ref={headerEl}>
        <ContentWrapper tagType='section'>
          <Container>
            <div className='header__content'>
              <div className='header__buttons-left'>{buttonsLeft}</div>

              <div className='header__buttons-right'>{!loading && buttonsRight}</div>
            </div>
          </Container>
        </ContentWrapper>
      </header>
      <Dropdown />
    </>
  );
};

export default Header;
