import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change_modal, toggle_modal } from '../../store/actions/modalActions';
import { set_dropdown } from '../../store/actions/headerActions';
import { log_out } from '../../store/actions/authActions';
import { set_header_dimen } from '../../store/actions/dimenActions';
import Link from 'next/link';
import Dropdown from './content/Dropdown';

// set_dropdown
const Header = ({
  auth,
  header,
  dimen,
  change_modal,
  toggle_modal,
  log_out,
  set_dropdown,
  set_header_dimen,
}) => {
  const openModal = (value) => (e) => {
    change_modal(value);
    toggle_modal();
  };

  const { header_width } = dimen;
  const { dropdown_active } = header;
  const { user, loading } = auth;

  const router = useRouter();
  const { _id } = router.query;

  const isSR = _id === 'sr';

  const activateDropdown = () => set_dropdown(true);
  /* const deactivateDropdown = useRef((e) => {
    let menuEl = e.target.closest('.header__menu');
    let menuItemEl = e.target.closest('.header__menu-item');

    if (menuEl) {
      if (menuItemEl) set_dropdown(false);
    } else {
      set_dropdown(false);
    }
  }); */

  const onSizeChange = () => set_header_dimen(headerEl.current);
  const onSizeChangeDelayed = () =>
    setTimeout(() => set_header_dimen(headerEl.current), 200);

  useEffect(() => {
    set_header_dimen(headerEl.current);
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

  const headerEl = useRef(false);

  const isGame =
    router.pathname === '/flashcards/[_id]' || router.pathname === '/write/[_id]'
      ? true
      : false;

  const buttonsRight = user ? (
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

  let buttonsLeft = (
    <>
      <Link href={user ? '/home/modules' : '/'}>
        <h1 className={`header__title ${isGame ? 'hidden__media-tablet' : ''}`}>
          {header_width > 620 ? 'Flash Cards' : 'FC'}
        </h1>
      </Link>
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
        <div className='container'>
          <div className='header__content'>
            <div className='header__buttons-left'>{buttonsLeft}</div>

            <div className='header__buttons-right'>{!loading && buttonsRight}</div>
          </div>
        </div>
      </header>
      <Dropdown />
    </>
  );
};

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  header: PropTypes.object.isRequired,
  dimen: PropTypes.object.isRequired,
  change_modal: PropTypes.func.isRequired,
  toggle_modal: PropTypes.func.isRequired,
  log_out: PropTypes.func.isRequired,
  set_dropdown: PropTypes.func.isRequired,
  set_header_dimen: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  header: state.header,
  dimen: state.dimen,
});

export default connect(mapStateToProps, {
  change_modal,
  toggle_modal,
  log_out,
  set_dropdown,
  set_header_dimen,
})(Header);

/* 

          {<div className='header__button header__button--back'>
            <button className='btn d-f h-primary-pale'>
              <svg width='25' height='25'>
                <use href='../img/sprite.svg#icon__game_back'></use>
              </svg>
            </button>
          </div> }

          { <div className='header__button header__button--options'>
            <button className='btn d-f h-primary-pale'>
              <svg width='30' height='30'>
                <use href='../img/sprite.svg#icon__game_options'></use>
              </svg>
            </button>
          </div> }

          // -------------------------------

              <div className='header__buttons-regular hidden'>
              <div
                className='header__btn-holder regular'
                id='new-module-regular'
              >
                <button
                  className='btn white fz175' onclick="location.href = hashValues.edit"
                  >
                  <svg fill='#ffffff' width='20' height='20'>
                    <use href='./sprite.svg#icon__new_module'></use>
                  </svg>
                  Create new module
                </button>
              </div>

              <div className='header__btn-holder regular'>
                <button className='btn white fz175' onclick="log_out()">
                  Log out
                </button>
              </div>

              <div className='header__btn-menu'>
                <button
                  className='btn' onclick="htmlGen.toggleHeaderMenu()"
                >
                  <svg width='25' height='25' fill='#ffffff'>
                    <use href='img/sprite.svg#icon__menu'></use>
                  </svg>
                </button>
              </div>
            </div>

            <div className='header__button-game-back hidden'>
              <button className='btn d-f' >
                onclick="active.return()" 
                <svg fill='#ffffff' width='25' height='25'>
                  <use href='img/sprite.svg#icon__game_back'></use>
                </svg>
              </button>
            </div>

            <div className='header__button-game-options hidden'>
              <button className='btn d-f' >
              onclick="htmlGen.options();"
                <svg fill='#ffffff' width='30' height='30'>
                  <use href='img/sprite.svg#icon__game_options'></use>
                </svg>
              </button>
            </div>

*/
