import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Question from './Question';
import Answer from './Answer';
import Round from './Round';
import Finish from './Finish';
import EditCard from '../../edit/content/EditCard';

const ContentContainer = ({ dimen, main, game }) => {
  const { header_height, game_controls_height } = dimen;
  const { cards, is_server, loading } = main;
  const {
    write: { is_init, remaining, answered, rounds },
  } = game;

  const writeStyles = {
    height: `${
      !is_server
        ? document.documentElement.clientHeight -
          header_height -
          (document.documentElement.clientWidth < 991 ? game_controls_height : 0)
        : 0
    }px`,
  };

  const activeCard = remaining[remaining.length - 1];
  const isAnswered = activeCard ? !!activeCard.answer : false;
  const activeCardData = activeCard ? cards[activeCard.id] : {};

  const isRoundFinished = !remaining.length && is_init;
  const isGameFinished =
    !remaining.length &&
    !answered.filter((item) => item.answer === 'incorrect').length &&
    is_init;

  // console.log(isRoundFinished, isGameFinished);

  let components = false;

  if (isGameFinished) {
    components = <Finish />;
  } else if (isRoundFinished) {
    components = <Round />;
  } else if (activeCard) {
    if (isAnswered) {
      if (activeCardData.edit) {
        components = (
          <EditCard
            key={activeCardData._id}
            data={activeCardData}
            toggle={true}
            game={true}
          />
        );
      } else {
        components = <Answer data={activeCardData} />;
      }
    } else {
      components = <Question data={activeCardData} />;
    }
  }

  return (
    <div
      className='game__content-container game__content-container--scrollable'
      style={writeStyles}
    >
      <div className='game__components game__components--scrollable'>
        {is_init && !loading ? components : <div className='game__loading-spinner' />}
      </div>
    </div>
  );
};

ContentContainer.propTypes = {
  main: PropTypes.object.isRequired,
  dimen: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  dimen: state.dimen,
  main: state.main,
  game: state.game,
});

export default connect(mapStateToProps)(ContentContainer);
