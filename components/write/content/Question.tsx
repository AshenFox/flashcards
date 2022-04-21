import { useRouter } from 'next/router';
import { ChangeEvent, FC, MouseEvent, useEffect, useRef } from 'react';
import {
  set_write_answer_field,
  check_write_answer,
} from '../../../store/actions/gameActions';
import ContentEditable from 'react-contenteditable';
import Speaker from '../../main/Speaker';
import Img from '../../main/Img';
import SRIndicator from '../../main/SRIngicator';
import { Card } from '../../../store/reducers/main/mainInitState';
import { useAppDispatch, useAppSelector } from '../../../store/store';

interface OwnProps {
  data: Card;
}

type Props = OwnProps;

const Question: FC<Props> = ({ data }) => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const { _id: _id_param } = router.query;

  const isSR = _id_param === 'sr';

  const { _id, term, defenition, imgurl } = data || {};
  const {
    write: { answer },
  } = useAppSelector(({ game }) => game);

  const hidTranscrDefenition = defenition.replaceAll(
    /\( \/(.*?)\/ \)/g,
    (x, match) => `( /<span class="game__definition-hidden">${match}</span>/ )`
  );

  const changeAnswer = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(set_write_answer_field(e.target.value));

  const keyDownAnswer = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      dispatch(check_write_answer());
    }
  };

  const clickAnswer = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(check_write_answer());
  };

  const clickNotKnow = (e: MouseEvent<HTMLSpanElement>) => {
    dispatch(check_write_answer(true));
  };

  const answerInput = useRef<HTMLInputElement>(null);

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
          <div className='game__question-dontknow'>
            <span onClick={clickNotKnow}>Don't know</span>
          </div>
        )}
        <Img
          containerClass={'game__question-img-container'}
          imgClass={'game__question-img'}
          url={imgurl}
        />
        <ContentEditable
          html={hidTranscrDefenition}
          disabled={true}
          className='game__question-definition'
          onChange={null}
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

export default Question;
