import { useRouter } from 'next/router';
import { ChangeEvent, FC, MouseEvent, useEffect, useRef } from 'react';
import Speaker from '@components/Speaker';
import Img from '@ui/Img';
import SRIndicator from '@components/SRIndicator';
import { Card } from '@store/reducers/main/mainInitState';
import { useActions, useAppSelector } from '@store/hooks';
import s from './styles.module.scss';
import clsx from 'clsx';
import { tooltipContainer } from '@ui/Tooltip';
import Textarea from '@ui/Textarea';

interface OwnProps {
  data: Card;
}

type Props = OwnProps;

const Answer: FC<Props> = ({ data }) => {
  const {
    set_card_edit,
    set_write_copy_answer_field,
    next_write_card,
    override_write_answer,
    put_sr_answer,
  } = useActions();

  const router = useRouter();
  const { _id: _id_param } = router.query;

  const isSR = _id_param === 'sr';

  const { _id, term, defenition, imgurl } = data;
  const {
    write: { answer, copy_answer, remaining, rounds },
  } = useAppSelector(({ game }) => game);

  const activeCard = remaining[remaining.length - 1];
  let isCorrect = false;
  if (activeCard.answer === 'correct') isCorrect = true;
  if (activeCard.answer === 'incorrect') isCorrect = false;

  const isEmpty = !answer && term;
  const copiedCorrectly = copy_answer === term.replace(/&nbsp;/g, ' ').trim();

  const isFirstRound = useRef(!rounds.length);
  isFirstRound.current = !rounds.length;

  const canContinue = useRef(false);

  const copyAnswerInput = useRef<HTMLInputElement>(null);

  const gameAnswer = useRef<HTMLDivElement>(null);

  if (isCorrect) {
    canContinue.current = true;
  } else {
    if (isEmpty) {
      if (copiedCorrectly) canContinue.current = true;
    } else {
      canContinue.current = true;
    }
  }

  const changeCopyAnswer = (e: ChangeEvent<HTMLInputElement>) =>
    set_write_copy_answer_field(e.target.value);

  const clickEdit = (e: MouseEvent<HTMLDivElement>) => set_card_edit(_id, true);

  const continueGame = () => {
    if (canContinue.current) {
      if (isFirstRound.current && isSR) put_sr_answer(_id, isCorrect ? 1 : -1);
      next_write_card();
    }
  };

  const overrideAnswer = () => {
    if (isFirstRound.current && isSR) put_sr_answer(_id, 1);
    override_write_answer();
  };

  const clickContinue = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    continueGame();
  };

  const clickOverride = (e: MouseEvent<HTMLButtonElement>) => {
    overrideAnswer();
  };

  const keyDownControl = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      continueGame();
    }

    if (e.key === 'o') {
      if (!isCorrect && !isEmpty) {
        overrideAnswer();
      }
    }
  };

  useEffect(() => {
    if (gameAnswer.current) gameAnswer.current.focus();
    if (copyAnswerInput.current) copyAnswerInput.current.focus();
    window.addEventListener('keydown', keyDownControl);

    return () => {
      window.removeEventListener('keydown', keyDownControl);
    };
  }, []);

  return (
    <div className='game__answer' tabIndex={0} ref={gameAnswer}>
      {isSR && (
        <SRIndicator data={data} className={clsx(s.indicator_answer, tooltipContainer)} />
      )}
      <div
        className={`game__edit game__edit--write${isSR ? '-sr' : ''}`}
        onClick={clickEdit}
      >
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
            <Textarea html={defenition} />
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
            <Textarea html={term} />
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

export default Answer;
