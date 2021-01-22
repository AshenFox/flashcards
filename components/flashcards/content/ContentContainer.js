import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import Navigation from './Navigation';
import Card from './Card';
import EndGame from './EndGame';
import EditCard from '../../edit/content/EditCard';
import Results from './Results';

const ContentContainer = ({ main, dimen, game }) => {
  const router = useRouter();
  const { _id } = router.query;

  const isSR = _id === 'sr';

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
          (document.documentElement.clientWidth < 991 ? game_controls_height : 0)
        : 0
    }px`,
  };

  const formatted_cards = Object.values(cards);
  const { length } = formatted_cards;

  const activeCardData = formatted_cards[progress];

  const isEnd = length === progress;
  const isEdit = length && length !== progress ? activeCardData.edit : false;

  return (
    <div
      className={`game__content-container game__content-container--${
        isEdit || (isSR && isEnd) ? '' : 'un'
      }scrollable`}
      style={flashcardsStyles}
    >
      <div
        className={`game__components game__components--${
          isEdit || (isSR && isEnd) ? '' : 'un'
        }scrollable`}
      >
        {loading || !length ? (
          <div className='game__loading-spinner' />
        ) : (
          <>
            <div className='game__cards-container'>
              {!isEdit &&
                !isEnd &&
                formatted_cards.map((card, i) => {
                  if (i === progress) {
                    return <Card key={card._id} data={card} side={side} />;
                  } else if (i === progress - 1 && (i === progress - 1) >= 0) {
                    return <Card key={card._id} data={card} position={'prev'} />;
                  } else if (i === progress + 1 && (i === progress + 1) <= length - 1) {
                    return <Card key={card._id} data={card} position={'next'} />;
                  } else {
                    return false;
                  }
                })}
              {!isEdit && length && isEnd && isSR ? (
                <Results />
              ) : (
                <EndGame active={isEnd} />
              )}
              {isEdit && (
                <EditCard
                  key={activeCardData._id}
                  data={activeCardData}
                  toggle={true}
                  game={true}
                />
              )}
            </div>
            {!isEdit && !isEnd && <Navigation />}
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

export default connect(mapStateToProps)(ContentContainer);
