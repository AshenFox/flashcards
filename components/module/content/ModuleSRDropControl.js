import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { set_module_question } from '../../../store/actions/editActions';

const ModuleSRDropControl = ({ main, set_module_question }) => {
  const {
    module: { question },
  } = main;

  const clickDropSR = () => set_module_question(true);

  return (
    <div
      className='module__drop-studyregime'
      data-active={question}
      onClick={clickDropSR}
    >
      <span>Drop all cards study progress</span>
      <svg width='30' height='30'>
        <use href='../img/sprite.svg#icon__drop_studyregime'></use>
      </svg>
    </div>
  );
};

ModuleSRDropControl.propTypes = {
  main: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
  set_module_question: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, {
  set_module_question,
})(ModuleSRDropControl);
