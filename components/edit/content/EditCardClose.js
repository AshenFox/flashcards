import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  set_card_edit,
  reset_gallery_fields,
} from '../../../store/actions/editActions';

const EditCardClose = ({ data, set_card_edit, reset_gallery_fields }) => {
  const { _id } = data;

  const clickClose = (e) => {
    set_card_edit(_id, false);
    reset_gallery_fields(_id);
  };

  return (
    <div className='edit__cards-close' onClick={clickClose}>
      <svg width='17' height='17'>
        <use href='../img/sprite.svg#icon__close'></use>
      </svg>
    </div>
  );
};

EditCardClose.propTypes = {
  set_card_edit: PropTypes.func.isRequired,
  reset_gallery_fields: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(false, {
  set_card_edit,
  reset_gallery_fields,
})(EditCardClose);
