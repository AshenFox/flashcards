import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { log_out } from '../../../store/actions/authActions';
import {
  set_flashcards_shuffled,
  sort_flashcards,
  shuffle_flashcards,
  reset_flashcards_progress,
} from '../../../store/actions/gameActions';
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
}) => {
  const { dropdown_active } = header;
  const { header_height } = dimen;
  const {
    flashcards: { shuffled },
  } = game;

  const router = useRouter();

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
      {isFlashcards && (
        <>
          <div className='header__menu-devider'>
            <span>Options:</span>
          </div>

          <div
            className={`header__menu-item ${shuffled ? 'active' : ''}`}
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
})(Dropdown);
