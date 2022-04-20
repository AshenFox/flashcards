import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { set_module_question } from '../../../store/actions/editActions';
import { drop_cards_sr } from '../../../store/actions/srActions';

const ModuleQuestion = ({ main, set_module_question, drop_cards_sr }) => {
  const {
    module: { question },
  } = main;

  useEffect(() => {
    setTimeout(
      () =>
        question
          ? window.addEventListener('click', deactivateQuestion.current)
          : window.removeEventListener('click', deactivateQuestion.current),
      0
    );

    return () => window.removeEventListener('click', deactivateQuestion.current);
  }, [question]);

  const deactivateQuestion = useRef((e) => {
    let questionEl = e.target.closest('.module__question');
    let questionAnswerEl = e.target.closest('.module__question-answer');

    if (questionEl) {
      if (questionAnswerEl) set_module_question(false);
    } else {
      set_module_question(false);
    }
  });

  const clickYes = () => drop_cards_sr();

  return (
    <div className='module__question module__question--big' data-active={question}>
      <p>Drop all cards study progress?</p>
      <div className='module__question-answer' data-answer='true' onClick={clickYes}>
        <span>Yes</span>
      </div>
      <div className='module__question-answer' data-answer='false'>
        <span>No</span>
      </div>
    </div>
  );
};

ModuleQuestion.propTypes = {
  main: PropTypes.object.isRequired,
  set_module_question: PropTypes.func.isRequired,
  drop_cards_sr: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
});

export default connect(mapStateToProps, { set_module_question, drop_cards_sr })(
  ModuleQuestion
);
