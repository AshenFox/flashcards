import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navigation from './Navigation';
import Card from './Card';
import EndGame from './EndGame';
import EditCard from '../../edit/content/EditCard';

const ContentContainer = ({ main, dimen, game }) => {
  const { cards, loading, is_server } = main;
  const {
    flashcards: { progress, side },
  } = game;

  const { header_height, game_controls_height } = dimen;

  const flashcardsStyles = {
    height: `${
      !is_server
        ? document.documentElement.clientHeight -
          header_height -
          (document.documentElement.clientWidth < 991
            ? game_controls_height
            : 0)
        : 0
    }px`,
  };

  const formatted_cards = Object.values(cards);

  let activeFound = false;

  const activeCardData = formatted_cards[progress];

  const isEnd = formatted_cards.length === progress;
  const isEdit =
    formatted_cards.length && formatted_cards.length !== progress
      ? activeCardData.edit
      : false;

  return (
    <div
      className={`game__content-container game__content-container--${
        isEdit ? '' : 'un'
      }scrollable`}
      style={flashcardsStyles}
    >
      <div
        className={`game__components game__components--${
          isEdit ? '' : 'un'
        }scrollable`}
      >
        {loading ? (
          <div className='game__loading-spinner' />
        ) : (
          <>
            <div className='game__cards-container'>
              {!isEdit &&
                formatted_cards.map((card, i) => {
                  if (i === progress) {
                    activeFound = true;

                    return <Card key={card._id} data={card} side={side} />;
                  }
                  if (activeFound) {
                    return (
                      <Card key={card._id} data={card} position={'next'} />
                    );
                  } else {
                    return (
                      <Card key={card._id} data={card} position={'prev'} />
                    );
                  }
                })}
              {!isEdit && formatted_cards.length && <EndGame active={isEnd} />}
              {isEdit && (
                <EditCard
                  key={activeCardData._id}
                  data={activeCardData}
                  toggle={true}
                  game={true}
                />
              )}
            </div>
            {!isEdit && <Navigation />}
          </>
        )}
      </div>
    </div>
  );
};

ContentContainer.propTypes = {
  main: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
  game: state.game,
  dimen: state.dimen,
});

export default connect(mapStateToProps, {})(ContentContainer);
