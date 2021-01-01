import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { set_flashcards_progress } from '../../../store/actions/gameActions';

const Navigation = ({ main, game, set_flashcards_progress }) => {
  const { cards } = main;
  const {
    flashcards: { progress },
  } = game;

  const clickNavItem = (value) => (e) => set_flashcards_progress(value);

  const cardsArr = Object.values(cards);

  return (
    <div className='game__nav'>
      <div className='game__nav-question hidden' data-active='true'>
        {/* ${
                  this.regime === "study" ? "" : "hidden"
                } */}
        <p>Did you know the answer?</p>
        <div className='game__nav-answer' data-answer='true'>
          <span>Yes</span>
        </div>
        <div className='game__nav-answer' data-answer='false'>
          <span>No</span>
        </div>
      </div>

      <div
        className={`game__nav-item prev ${
          progress <= 0 ? 'game__nav-item--inactive' : ''
        }`}
        onClick={clickNavItem('prev')}
      >
        {/* ${
                  this.regime === "study" ? "hidden" : ""
                } */}
        <button className='btn pad15 bcc-white brr50p d-f h-bcc-yellow mar-left-a p-r'>
          <svg>
            <use href='../img/sprite.svg#icon__triangle_left'></use>
          </svg>
        </button>
      </div>

      <div
        className={`game__nav-item next ${
          progress >= cardsArr.length ? 'game__nav-item--inactive' : ''
        }`}
        onClick={clickNavItem('next')}
      >
        {/* ${
                  this.regime === "study" ? "hidden" : ""
                } */}
        <button className='btn pad15 bcc-white brr50p d-f h-bcc-yellow p-r'>
          <svg>
            <use href='../img/sprite.svg#icon__triangle_right'></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

Navigation.propTypes = {
  main: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
  game: state.game,
});

export default connect(mapStateToProps, { set_flashcards_progress })(
  Navigation
);
