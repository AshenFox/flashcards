import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { set_card_question } from '../../../store/actions/editActions';

const CardQuestion = ({ data, set_card_question }) => {
  const { question, _id } = data;

  useEffect(() => {
    setTimeout(
      () =>
        question
          ? window.addEventListener(
              'click',
              deactivateQuestion.current
            )
          : window.removeEventListener(
              'click',
              deactivateQuestion.current
            ),
      0
    );

    return () =>
      window.removeEventListener('click', deactivateQuestion.current);
  }, [question]);

  const deactivateQuestion = useRef((e) => {
    let questionEl = e.target.closest('.module__question');
    let questionAnswerEl = e.target.closest(
      '.module__question-answer'
    );

    if (questionEl) {
      if (questionAnswerEl) set_card_question(_id, false);
    } else {
      set_card_question(_id, false);
    }
  });

  return (
    <div className='module__question' data-active={question}>
      <p>Drop card study progress?</p>
      <div className='module__question-answer' data-answer='true'>
        <span>Yes</span>
      </div>
      <div className='module__question-answer' data-answer='false'>
        <span>No</span>
      </div>
    </div>
  );
};

CardQuestion.propTypes = {
  data: PropTypes.object.isRequired,
  set_card_question: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(false, { set_card_question })(CardQuestion);
