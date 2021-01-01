import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Progress = ({ main, game }) => {
  const {
    flashcards: { progress },
  } = game;
  const { cards } = main;

  const cards_arr = Object.keys(cards);

  const barFillStyle = {
    width: `${(progress / cards_arr.length) * 100}%`,
  };

  return (
    <div className='game__progress'>
      <div className='game__progress-bar'>
        <div className='game__bar-fill' style={barFillStyle}></div>
      </div>
      <div className='game__progress-info'>
        <div className='game__progress-title'>
          <span>progress</span>
        </div>

        <div className='game__progress-count'>
          <span>{progress}</span>
          <span>{`/${cards_arr.length}`}</span>
          {/* ${this.number} */}
        </div>
      </div>
    </div>
  );
};

Progress.propTypes = {};

const mapStateToProps = (state) => ({
  main: state.main,
  game: state.game,
});

export default connect(mapStateToProps)(Progress);
