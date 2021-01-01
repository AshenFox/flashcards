import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { create_card } from '../../../store/actions/editActions';

const AddCard = ({ create_card }) => {
  const clickAddcard = () => {
    create_card();
  };
  return (
    <div className='edit__cards-addcard' onClick={clickAddcard}>
      <button
        className='btn fz15 uppercase grey h-yellow pad-bot10 br-bottom5 brc-lightblue h-brc-yellow'
        type='button'
      >
        + add card
      </button>
    </div>
  );
};

AddCard.propTypes = {
  create_card: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { create_card })(AddCard);
