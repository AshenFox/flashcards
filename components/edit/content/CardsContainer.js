import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EditCard from './EditCard';
import ScrollLoading from '../../home/content/ScrollLoading';
import AddCard from './AddCard';
import Save from './Save';

const CardsContainer = ({ main }) => {
  const { cards, loading, module } = main;

  const formatted_cards = Object.values(cards);

  return (
    <>
      <div className='edit__cards'>
        <div className='container'>
          <div className='edit__cards-container'>
            {formatted_cards.map((card, i, arr) => (
              <EditCard
                key={card._id}
                data={card}
                index={i + 1}
                loading={loading}
                draft={module.draft}
                number={arr.length}
              />
            ))}
            {loading && <ScrollLoading loading={loading} />}
          </div>
          {!!formatted_cards.length && <AddCard />}
        </div>
      </div>
      {!!formatted_cards.length && <Save />}
    </>
  );
};

CardsContainer.propTypes = {
  main: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
});

export default connect(mapStateToProps, {})(CardsContainer);
