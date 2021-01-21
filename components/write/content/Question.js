import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  set_write_answer_field,
  check_write_answer,
} from '../../../store/actions/gameActions';
import ContentEditable from 'react-contenteditable';
import Speaker from '../../main/Speaker';
import Img from '../../main/Img';
import SRIndicator from '../../main/SRIngicator';

const Question = ({ data, game, set_write_answer_field, check_write_answer }) => {
  const router = useRouter();
  const { _id: _id_param } = router.query;

  const isSR = _id_param === 'sr';

  const { _id, term, defenition, imgurl } = data;
  const {
    write: { answer },
  } = game;

  const changeAnswer = (e) => set_write_answer_field(e.target.value);

  const keyDownAnswer = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      check_write_answer();
    }
  };

  const clickAnswer = (e) => {
    e.preventDefault();
    check_write_answer();
  };

  const clickNotKnow = (e) => {
    check_write_answer(true);
  };

  const answerInput = useRef(false);

  useEffect(() => {
    if (answerInput.current) answerInput.current.focus();
    window.addEventListener('keydown', keyDownAnswer);

    return () => {
      window.removeEventListener('keydown', keyDownAnswer);
    };
  }, []);

  return (
    <div className='game__question'>
      <div className='game__question-container'>
        {isSR && (
          <SRIndicator
            data={data}
            classStr={'sr-indicator--write sr-indicator--write--1'}
          />
        )}
        {term && (
          <div className='game__question-dontknow' onClick={clickNotKnow}>
            <span>Don't know</span>
          </div>
        )}
        <Img
          containerClass={'game__question-img-container'}
          imgClass={'game__question-img'}
          url={imgurl}
        />
        <ContentEditable
          html={defenition}
          disabled={true}
          className='game__question-definition'
        />
        <Speaker
          _id={_id}
          text={defenition}
          type={'definition'}
          className='game__speaker-write'
        />
      </div>
      <form action='' className='game__form' autoComplete='off'>
        <fieldset className='game__form-fieldset'>
          <div className='game__form-input'>
            <input
              type='text'
              id='write-input'
              autoComplete='off'
              onChange={changeAnswer}
              value={answer}
              ref={answerInput}
            />
          </div>

          <label htmlFor='write-input'>type the answer</label>
        </fieldset>
        <div className='game__form-btn-container'>
          <button
            className='btn bcc-lightblue pad10-30 brr15 white fz15 fw-normal h-grey h-bcc-yellow'
            onClick={clickAnswer}
          >
            Answer
          </button>
        </div>
      </form>
    </div>
  );
};

Question.propTypes = {
  data: PropTypes.object.isRequired,
  set_write_answer_field: PropTypes.func.isRequired,
  check_write_answer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps, {
  set_write_answer_field,
  check_write_answer,
})(Question);

/* 



<div class="game__question-dontknow">
          <span>Don't know</span>
        </div>
        <div class="game__question-img ${
          imgurl === '' ? 'hidden' : ''
        }" style="background-image: url(${imgurl !== '' ? imgurl : ''});"></div>
        <div class="game__question-defenition">
          <p>${defenition}</p>
          <div class="game__speaker-write" data-active="${
            voice.working &&
            defenition !== '' &&
            voice.detectLanguage(defenition)
              ? 'true'
              : 'false'
          }">
            <svg height="22" width="22">
              <use href="../img/sprite.svg#icon__speaker"></use>
            </svg>
          </div>
        </div>
        <form action="" class="game__form" autocomplete="off">
          <fieldset class="game__form-fieldset">
            <div class="game__form-input">
              <input type="text" id="write-input" autocomplete="off"/>
            </div>
            
            <label htmlFor="write-input">type the answer</label>
          </fieldset>
          <div class="game__form-btn-container">
            <button class="btn bcc-lightblue pad10-30 brr15 white fz15 fw-normal h-grey h-bcc-yellow">Answer</button>
          </div>
        </form>

*/
