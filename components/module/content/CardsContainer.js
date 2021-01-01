import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from './Card';
import EditCard from '../../edit/content/EditCard';
import NotFound from './NotFound';
import ScrollLoading from '../../home/content/ScrollLoading';

const CardsContainer = ({ main }) => {
  const { cards, loading, search_cards, select } = main;

  const formatted_cards = Object.values(cards);

  return (
    <div className='module__card-cont'>
      {formatted_cards.map((card) =>
        card.edit ? (
          <EditCard
            key={card._id}
            data={card}
            toggle={true}
            loading={loading}
          />
        ) : (
          <Card
            key={card._id}
            data={card}
            filter={search_cards.value}
            filter_type={select.value}
          />
        )
      )}
      {loading && <ScrollLoading loading={loading} />}
      {!loading && <NotFound />}
    </div>
  );
};

CardsContainer.propTypes = {
  main: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
});

export default connect(mapStateToProps)(CardsContainer);
