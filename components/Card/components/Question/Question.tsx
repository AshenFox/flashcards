import { MouseEvent as ReactMouseEvent, memo, useEffect, useRef } from 'react';
import { useActions } from '@store/hooks';
import { Card } from '@store/reducers/main/mainInitState';
import s from './styles.module.scss';

type QuestionProps = {
  data: Card;
};

const Question = ({ data }: QuestionProps) => {
  const { set_card_question, drop_card_sr } = useActions();

  const { question, _id } = data;

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

  const deactivateQuestion = useRef((e: MouseEvent) => {
    let questionEl = (e.target as HTMLElement).closest(`.${s.question}`);
    let questionAnswerEl = (e.target as HTMLElement).closest(`.${s.answer}`);

    console.log({ questionEl, questionAnswerEl, target: e.target }, s.question, s.answer);

    if (questionEl) {
      if (questionAnswerEl) {
        set_card_question(_id, false);
      }
    } else {
      set_card_question(_id, false);
    }
  });

  const clickYes = (e: ReactMouseEvent<HTMLDivElement>) => drop_card_sr(_id);

  return (
    <div className={s.question} data-active={question}>
      <p>Drop card study progress?</p>
      <div className={s.answer} data-answer='true' onClick={clickYes}>
        <span>Yes</span>
      </div>
      <div className={s.answer} data-answer='false'>
        <span>No</span>
      </div>
    </div>
  );
};

export default memo(Question);
