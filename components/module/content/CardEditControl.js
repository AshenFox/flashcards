import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { set_card_edit } from '../../../store/actions/editActions';

const CardEditControl = ({ data, set_card_edit }) => {
  const { _id } = data;

  const clickEdit = (e) => set_card_edit(_id, true);

  return (
    <div className='module__card-controls-item module__edit-card' onClick={clickEdit}>
      <svg width='19' height='19'>
        <use href='../img/sprite.svg#icon__edit'></use>
      </svg>
    </div>
  );
};

CardEditControl.propTypes = {
  set_card_edit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(false, { set_card_edit })(CardEditControl);
