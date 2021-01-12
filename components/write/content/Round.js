import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { next_write_round } from '../../../store/actions/gameActions';

const Round = ({ game, next_write_round }) => {
  const {
    write: { answered, rounds, all_cards_num },
  } = game;

  const correctAnswered = answered.filter((item) => item.answer === 'correct')
    .length;
  let correctRounds = 0;
  for (const round of rounds) {
    let correctRound = round.filter((item) => item.answer === 'correct').length;
    correctRounds += correctRound;
  }

  const correctNum = correctAnswered + correctRounds;
  const incorrectNum = answered.filter((item) => item.answer === 'incorrect')
    .length;
  const roundCardsNum = answered.length;

  const roundNum = rounds.length + 1;

  const clickContinue = (e) => {
    next_write_round();
  };

  const keyDownContinue = (e) => {
    if (e.key === 'Enter') {
      next_write_round();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keyDownContinue);

    return () => {
      window.removeEventListener('keydown', keyDownContinue);
    };
  }, []);

  return (
    <div className='game__round'>
      <h1 className='game__round-title'>
        <span>Round </span>
        <span>{roundNum}</span>
      </h1>
      <div className='game__round-body'>
        <div className='game__score-field game__score-field--correct'>
          <span className='game__score-title'>Correct</span>
          <span className='game__score-number'>{correctAnswered}</span>
          <span className='game__score-percent'>
            {Math.round((correctAnswered / roundCardsNum) * 100)}%
          </span>
        </div>

        <div className='game__score-field game__score-field--incorrect'>
          <span className='game__score-title'>Incorrect</span>
          <span className='game__score-number'>{incorrectNum}</span>
          <span className='game__score-percent'>
            {Math.round((incorrectNum / roundCardsNum) * 100)}%
          </span>
        </div>

        <div className='game__score-field'>
          <span className='game__score-title'>Overall progress</span>
          <span className='game__score-number'>
            {correctNum}/{all_cards_num}
          </span>
          <span className='game__score-percent'>
            {Math.round((correctNum / all_cards_num) * 100)}%
          </span>
        </div>
      </div>

      <div className='game__round-continue'>
        <button
          className='btn bcc-lightblue pad10-30 brr15 white fz15 fw-normal h-grey h-bcc-yellow'
          onClick={clickContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

Round.propTypes = {
  game: PropTypes.object.isRequired,
  next_write_round: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps, { next_write_round })(Round);
