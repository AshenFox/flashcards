import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  set_flashcards_shuffled,
  sort_flashcards,
  shuffle_flashcards,
  reset_flashcards_progress,
} from '../../../store/actions/gameActions';

const ShuffleBtn = ({
  game,
  set_flashcards_shuffled,
  sort_flashcards,
  shuffle_flashcards,
  reset_flashcards_progress,
}) => {
  const {
    flashcards: { shuffled },
  } = game;

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

  return (
    <div className={`game__shuffle ${shuffled ? 'active' : ''}`}>
      <button
        className='btn width100 fz15 pad7 br2 brc-grey-medium brr15 lightblue h-yellow'
        onClick={clickSuffle}
      >
        <svg height='20' width='20'>
          <use href='../img/sprite.svg#icon__shuffle'></use>
        </svg>
        <span>Shuffle</span>
      </button>
    </div>
  );
};

ShuffleBtn.propTypes = {
  game: PropTypes.object.isRequired,
  set_flashcards_shuffled: PropTypes.func.isRequired,
  sort_flashcards: PropTypes.func.isRequired,
  shuffle_flashcards: PropTypes.func.isRequired,
  reset_flashcards_progress: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps, {
  set_flashcards_shuffled,
  sort_flashcards,
  shuffle_flashcards,
  reset_flashcards_progress,
})(ShuffleBtn);
