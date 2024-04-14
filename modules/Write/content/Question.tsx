import { useRouter } from 'next/router';
import { ChangeEvent, FC, MouseEvent, useCallback, useEffect, useRef } from 'react';
import Speaker from '@components/Speaker';
import Img from '@ui/Img';
import SRIndicator from '@components/SRIndicator';
import { Card } from '@store/reducers/main/mainInitState';
import { useActions, useAppSelector } from '@store/hooks';
import s from './styles.module.scss';
import clsx from 'clsx';
import { tooltipContainer } from '@ui/Tooltip';
import TextArea from '@ui/TextArea';
import TextLabel from '@ui/TextLabel';

interface OwnProps {
  data: Card;
}

type Props = OwnProps;

const Question: FC<Props> = ({ data }) => {
  const { set_write_answer_field, check_write_answer } = useActions();

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
    set_write_answer_field(e.target.value);

  const keyDownAnswer = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        check_write_answer();
      }
    },
    [check_write_answer]
  );

  const clickAnswer = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    check_write_answer();
  };

  const clickNotKnow = (e: MouseEvent<HTMLSpanElement>) => {
    check_write_answer(true);
  };

  const answerInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (answerInput.current) answerInput.current.focus();
    window.addEventListener('keydown', keyDownAnswer);

    return () => {
      window.removeEventListener('keydown', keyDownAnswer);
    };
  }, [keyDownAnswer]);

  return (
    <div className='game__question'>
      <div className='game__question-container'>
        {isSR && (
          <SRIndicator
            data={data}
            className={clsx(s.indicator_question, tooltipContainer)}
          />
        )}
        {term && (
          <div className='game__question-dontknow'>
            <span onClick={clickNotKnow}>Don&apos;t know</span>
          </div>
        )}
        <Img
          containerClass={'game__question-img-container'}
          imgClass={'game__question-img'}
          url={imgurl}
        />
        <TextArea html={hidTranscrDefenition} className='game__question-definition' />
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
          <TextLabel htmlFor='write-input'>type the answer</TextLabel>
        </fieldset>
        <div className='game__form-btn-container'>
          <button
            //helpers-delete
            className='bcc-lightblue pad10-30 brr15 white fz15 fw-normal h-grey h-bcc-yellow'
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
