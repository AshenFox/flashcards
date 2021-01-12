import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { log_out } from '../../../store/actions/authActions';
import {
  set_flashcards_shuffled,
  sort_flashcards,
  shuffle_flashcards,
  reset_flashcards_progress,
  prepare_write,
} from '../../../store/actions/gameActions';
import { set_dropdown } from '../../../store/actions/headerActions';
import Link from 'next/link';

const Dropdown = ({
  header,
  dimen,
  game,
  log_out,
  set_flashcards_shuffled,
  sort_flashcards,
  shuffle_flashcards,
  reset_flashcards_progress,
  prepare_write,
  set_dropdown,
}) => {
  const { dropdown_active } = header;
  const { header_height } = dimen;
  const {
    flashcards: { shuffled },
  } = game;

  const router = useRouter();

  const deactivateDropdown = useRef((e) => {
    let menuEl = e.target.closest('.header__menu');
    let menuItemEl = e.target.closest('.header__menu-item');

    if (menuEl) {
      if (menuItemEl) set_dropdown(false);
    } else {
      set_dropdown(false);
    }
  });

  useEffect(() => {
    setTimeout(
      () =>
        dropdown_active
          ? window.addEventListener(
              'click',
              deactivateDropdown.current
            )
          : window.removeEventListener(
              'click',
              deactivateDropdown.current
            ),
      0
    );
    return () =>
      window.removeEventListener('click', deactivateDropdown.current);
  }, [dropdown_active]);

  const clickSuffle = () => {
    if (shuffled) {
      sort_flashcards();
      set_flashcards_shuffled(false);
    } else {
      shuffle_flashcards();
      set_flashcards_shuffled(true);
    }

    reset_flashcards_progress();
  };

  const clickStartOver = () => prepare_write();

  const stylesHeader = { paddingTop: `${header_height}px` };

  const isFlashcards = router.pathname === '/flashcards/[_id]',
    isWrite = router.pathname === '/write/[_id]';

  return (
    <div
      className={`header__menu ${
        dropdown_active ? 'header__menu--active' : ''
      } ${
        isFlashcards || isWrite
          ? 'hidden__media-min-tablet'
          : 'hidden__media-min-mobile'
      }`}
      style={stylesHeader}
    >
      {router.asPath !== '/edit/draft' && (
        <div className='header__menu-item'>
          <Link href='/edit/draft'>
            <button className='btn fz15'>
              <svg width='20' height='20'>
                <use href='../img/sprite.svg#icon__new_module'></use>
              </svg>
              <span>Create new module</span>
            </button>
          </Link>
        </div>
      )}

      <div className='header__menu-item' onClick={log_out}>
        <button className='btn fz15'>
          <span>Log out</span>
        </button>
      </div>
      {(isFlashcards || isWrite) && (
        <div className='header__menu-devider'>
          <span>Options:</span>
        </div>
      )}
      {isFlashcards && (
        <>
          <div
            className={`header__menu-item ${
              shuffled ? 'active' : ''
            }`}
            onClick={clickSuffle}
          >
            <button className='btn fz15'>
              <svg width='20' height='20'>
                <use href='../img/sprite.svg#icon__shuffle'></use>
              </svg>
              <span>Shuffle</span>
            </button>
          </div>
        </>
      )}
      {isWrite && (
        <>
          <div
            className={`header__menu-item caution`}
            onClick={clickStartOver}
          >
            <button className='btn fz15'>
              <span>Start over</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  header: PropTypes.object.isRequired,
  dimen: PropTypes.object.isRequired,
  log_out: PropTypes.func.isRequired,
  set_flashcards_shuffled: PropTypes.func.isRequired,
  sort_flashcards: PropTypes.func.isRequired,
  shuffle_flashcards: PropTypes.func.isRequired,
  reset_flashcards_progress: PropTypes.func.isRequired,
  prepare_write: PropTypes.func.isRequired,
  set_dropdown: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  header: state.header,
  dimen: state.dimen,
  game: state.game,
});

export default connect(mapStateToProps, {
  log_out,
  set_flashcards_shuffled,
  sort_flashcards,
  shuffle_flashcards,
  reset_flashcards_progress,
  prepare_write,
  set_dropdown,
})(Dropdown);
