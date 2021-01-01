import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from './Card';
import EndGame from './EndGame';
import EditCard from '../../edit/content/EditCard';

const CardsContainer = ({ main, game }) => {
  const { cards, loading } = main;
  const {
    flashcards: { progress, card_status, side },
  } = game;

  const formatted_cards = Object.values(cards);

  let activeFound = false;
  const isEnd = formatted_cards.length === progress;

  return (
    <div className='game__cards-container'>
      {formatted_cards.map((card, i) => {
        if (i === progress) {
          activeFound = true;
          return <Card key={card._id} data={card} side={side} />;
        }
        if (activeFound) {
          return <Card key={card._id} data={card} position={'next'} />;
        } else {
          return <Card key={card._id} data={card} position={'prev'} />;
        }
      })}
      <EndGame active={isEnd} />
      {/* {formatted_cards.length && (
        <EditCard data={formatted_cards[0]} toggle={true} game={true} />
      )} */}
    </div>
  );
};

CardsContainer.propTypes = {
  main: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
  game: state.game,
});

export default connect(mapStateToProps, {})(CardsContainer);
