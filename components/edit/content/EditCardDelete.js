import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { delete_card } from '../../../store/actions/editActions';

const EditCardDelete = ({ data, active, delete_card }) => {
  const { _id } = data;

  const clickCardDelete = (e) => active && delete_card(_id);

  return (
    <div
      className={`edit__cards-delete ${
        active ? '' : 'edit__cards-delete--inactive'
      }`}
      onClick={clickCardDelete}
    >
      <svg width='17' height='17'>
        <use href='../img/sprite.svg#icon__delete'></use>
      </svg>
    </div>
  );
};

EditCardDelete.propTypes = {
  data: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
  delete_card: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(false, {
  delete_card,
})(EditCardDelete);
