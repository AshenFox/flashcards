import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { set_card_edit } from '../../../store/actions/editActions';
import {
  set_write_copy_answer_field,
  next_write_card,
  override_write_answer,
} from '../../../store/actions/gameActions';
import ContentEditable from 'react-contenteditable';
import Speaker from '../../main/Speaker';
import Img from '../../main/Img';
import SRIndicator from '../../main/SRIngicator';

const Answer = ({
  data,
  game,
  set_card_edit,
  set_write_copy_answer_field,
  next_write_card,
  override_write_answer,
}) => {
  const { _id, term, defenition, imgurl } = data;
  const {
    write: { answer, copy_answer, remaining },
  } = game;

  const activeCard = remaining[remaining.length - 1];
  let isCorrect = false;
  if (activeCard.answer === 'correct') isCorrect = true;
  if (activeCard.answer === 'incorrect') isCorrect = false;

  const isEmpty = !answer && term;
  const copiedCorrectly = copy_answer === term.replace(/&nbsp;/g, ' ').trim();

  const canContinue = useRef(false);

  const copyAnswerInput = useRef(false);

  if (isCorrect) {
    canContinue.current = true;
  } else {
    if (isEmpty) {
      if (copiedCorrectly) canContinue.current = true;
    } else {
      canContinue.current = true;
    }
  }

  const changeCopyAnswer = (e) => set_write_copy_answer_field(e.target.value);

  const clickEdit = () => set_card_edit(_id, true);

  const clickContinue = (e) => {
    e.preventDefault();

    if (canContinue.current) next_write_card();
  };

  const clickOverride = () => override_write_answer();

  const keyDownControl = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (canContinue.current) next_write_card();
    }

    if (e.key === 'o') {
      if (!isCorrect && !isEmpty) override_write_answer();
    }
  };

  useEffect(() => {
    if (copyAnswerInput.current) copyAnswerInput.current.focus();
    window.addEventListener('keydown', keyDownControl);

    return () => {
      window.removeEventListener('keydown', keyDownControl);
    };
  }, []);

  return (
    <div className='game__answer'>
      <SRIndicator data={data} classStr={'sr-indicator--write sr-indicator--write--2'} />
      <div className='game__edit game__edit--write' onClick={clickEdit}>
        <svg width='21' height='21'>
          <use href='../img/sprite.svg#icon__edit'></use>
        </svg>
      </div>
      <h1 className={`game__answer-type ${activeCard.answer}`}>
        {activeCard.answer && activeCard.answer}
      </h1>

      <div className='game__answer-main'>
        <div className='game__answer-section '>
          <span className='game__section-title'>Definition</span>
          <Img
            containerClass={'game__section-img-container'}
            imgClass={'game__section-img'}
            url={imgurl}
          />
          <div className='game__section-body '>
            <ContentEditable html={defenition} disabled={true} />
            <Speaker
              _id={_id}
              text={defenition}
              type={'definition'}
              className='game__speaker-write'
            />
          </div>
        </div>
        {!isCorrect && !isEmpty && (
          <div className='game__answer-section '>
            <span className='game__section-title'>You said</span>
            <div className='game__section-body'>
              <div className='game__section-text'>{answer}</div>
              <div className='game__override'>
                <button
                  className='btn fz15 fw-normal lightblue h-yellow'
                  onClick={clickOverride}
                >
                  Override: I was right
                </button>
              </div>
            </div>
          </div>
        )}

        <div className='game__answer-section'>
          <span className='game__section-title'>Correct</span>
          <div className='game__section-body '>
            <ContentEditable html={term} disabled={true} />
            <Speaker
              _id={_id}
              text={term}
              type={'term'}
              className='game__speaker-write'
            />
          </div>
        </div>

        {!isCorrect && isEmpty && (
          <form action='' className='game__form' autoComplete='off'>
            <fieldset className='game__form-fieldset'>
              <div className='game__form-input' data-correct='false'>
                <input
                  type='text'
                  id='write-input'
                  autoComplete='off'
                  value={copy_answer}
                  onChange={changeCopyAnswer}
                  ref={copyAnswerInput}
                />
              </div>
              <label htmlFor='write-input'>copy answer</label>
            </fieldset>
          </form>
        )}
      </div>

      <div className='game__answer-continue' data-correct={canContinue.current}>
        <button
          className='btn bcc-lightblue pad10-30 brr15 white fz15 fw-normal h-grey h-bcc-yellow'
          onClick={clickContinue}
        >
          Click to continue
        </button>
      </div>
    </div>
  );
};

Answer.propTypes = {
  data: PropTypes.object.isRequired,
  set_card_edit: PropTypes.func.isRequired,
  set_write_copy_answer_field: PropTypes.func.isRequired,
  next_write_card: PropTypes.func.isRequired,
  override_write_answer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps, {
  set_card_edit,
  set_write_copy_answer_field,
  next_write_card,
  override_write_answer,
})(Answer);
