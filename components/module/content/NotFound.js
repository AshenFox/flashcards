import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const NotFound = ({ main }) => {
  const { cards, search_cards } = main;

  let content;

  const cardsArr = Object.values(cards);

  if (!cardsArr.length)
    content = (
      <p>
        No cards matching <b>{`"${search_cards.value}"`}</b> found.
      </p>
    );

  return <div className='module__none-found'>{content}</div>;
};

NotFound.propTypes = {
  main: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
});

export default connect(mapStateToProps)(NotFound);
