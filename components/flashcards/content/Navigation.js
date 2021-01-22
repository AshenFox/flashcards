import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  set_flashcards_progress,
  save_flashcards_answer,
  set_flashcards_side,
} from '../../../store/actions/gameActions';
import { put_sr_answer } from '../../../store/actions/srActions';

const Navigation = ({
  main,
  game,
  set_flashcards_progress,
  save_flashcards_answer,
  set_flashcards_side,
  put_sr_answer,
}) => {
  const router = useRouter();
  const { _id } = router.query;

  const isSR = _id === 'sr';

  const { cards } = main;
  const {
    flashcards: { progress, is_turned, side },
  } = game;

  const clickNavItem = (value, cardAnswer) => (e) => {
    if (value === 'next' && isSR) {
      if (cardAnswer === 'correct') put_sr_answer(activeCardData._id, 1);
      if (cardAnswer === 'incorrect') put_sr_answer(activeCardData._id, -1);

      save_flashcards_answer(activeCardData._id, cardAnswer);
    }
    set_flashcards_progress(value);
  };

  const cardsArr = Object.values(cards);

  const activeCardData = cardsArr[progress];

  const _idRef = useRef(activeCardData._id);
  const sideRef = useRef(side);
  const isTurnedRef = useRef(is_turned);

  _idRef.current = activeCardData._id;
  sideRef.current = side;
  isTurnedRef.current = is_turned;

  useEffect(() => {
    const keyDown = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        if (sideRef.current === 'term') {
          set_flashcards_side('definition');
          return;
        }
        if (sideRef.current === 'definition') {
          set_flashcards_side('term');
          return;
        }
      }

      if (isSR && isTurnedRef.current) {
        if (e.key === 'ArrowRight') {
          put_sr_answer(_idRef.current, 1);
          save_flashcards_answer(_idRef.current, 'correct');
          set_flashcards_progress('next');
        }

        if (e.key === 'ArrowLeft') {
          put_sr_answer(_idRef.current, -1);
          save_flashcards_answer(_idRef.current, 'incorrect');
          set_flashcards_progress('next');
        }
      }

      if (!isSR) {
        if (e.key === 'ArrowLeft') {
          set_flashcards_progress('prev');
        }

        if (e.key === 'ArrowRight') {
          set_flashcards_progress('next');
        }
      }
    };

    window.addEventListener('keydown', keyDown);

    return () => window.removeEventListener('keydown', keyDown);
  }, []);

  return (
    <div className='game__nav'>
      <div
        className={`game__nav-question ${isSR ? '' : 'hidden'}`}
        data-active={is_turned}
      >
        <p>Did you know the answer?</p>
        <div
          className='game__nav-answer'
          data-answer='true'
          onClick={clickNavItem('next', 'correct')}
        >
          <span>Yes</span>
        </div>
        <div
          className='game__nav-answer'
          data-answer='false'
          onClick={clickNavItem('next', 'incorrect')}
        >
          <span>No</span>
        </div>
      </div>

      <div
        className={`game__nav-item prev ${isSR ? 'hidden' : ''} ${
          progress <= 0 ? 'game__nav-item--inactive' : ''
        }`}
        onClick={clickNavItem('prev')}
      >
        <button className='btn pad15 bcc-white brr50p d-f h-bcc-yellow mar-left-a p-r'>
          <svg>
            <use href='../img/sprite.svg#icon__triangle_left'></use>
          </svg>
        </button>
      </div>

      <div
        className={`game__nav-item next ${isSR ? 'hidden' : ''} ${
          progress >= cardsArr.length ? 'game__nav-item--inactive' : ''
        }`}
        onClick={clickNavItem('next')}
      >
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
  set_flashcards_side: PropTypes.func.isRequired,
  put_sr_answer: PropTypes.func.isRequired,
  set_flashcards_progress: PropTypes.func.isRequired,
  save_flashcards_answer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
  game: state.game,
});

export default connect(mapStateToProps, {
  set_flashcards_progress,
  save_flashcards_answer,
  set_flashcards_side,
  put_sr_answer,
})(Navigation);
