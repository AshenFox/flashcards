import PropTypes from 'prop-types';

const Round = (props) => {
  return (
    <div className='game__round'>
      <h1 className='game__round-title'>
        <span>Round </span>
        <span>1</span>
      </h1>
      <div className='game__round-body'>
        <div className='game__score-field game__score-field--correct'>
          <span className='game__score-title'>Correct</span>
          <span className='game__score-number'>3</span>
          <span className='game__score-percent'>75%</span>
        </div>

        <div className='game__score-field game__score-field--incorrect'>
          <span className='game__score-title'>Incorrect</span>
          <span className='game__score-number'>1</span>
          <span className='game__score-percent'>25%</span>
        </div>

        <div className='game__score-field'>
          <span className='game__score-title'>Overall progress</span>
          <span className='game__score-number'>3/4</span>
          <span className='game__score-percent'>75%</span>
        </div>
      </div>

      <div className='game__round-continue'>
        <button className='btn bcc-lightblue pad10-30 brr5 white fz15 fw-normal h-grey h-bcc-yellow'>
          Tap to continue
        </button>
      </div>
    </div>
  );
};

Round.propTypes = {};

export default Round;
