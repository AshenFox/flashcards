import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { set_card_question } from '../../../store/actions/editActions';

const CardSRDropControl = ({ data, set_card_question }) => {
  const { question, _id } = data;

  const clickDropSR = () => set_card_question(_id, true);

  return (
    <div
      className='module__drop-card-study-regime'
      onClick={clickDropSR}
      data-active={question}
    >
      <svg height='19' width='19'>
        <use href='../img/sprite.svg#icon__drop_studyregime'></use>
      </svg>
      <span>Drop card study progress</span>
    </div>
  );
};

CardSRDropControl.propTypes = {
  set_card_question: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(false, { set_card_question })(CardSRDropControl);
