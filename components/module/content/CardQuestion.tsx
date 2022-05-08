import { FC, MouseEvent as ReactMouseEvent, useEffect, useRef } from 'react';
import { useActions } from '../../../store/hooks';
import { Card } from '../../../store/reducers/main/mainInitState';

interface OwnProps {
  data: Card;
}

type Props = OwnProps;

const CardQuestion: FC<Props> = ({ data }) => {
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
    let questionEl = (e.target as HTMLElement).closest('.module__question');
    let questionAnswerEl = (e.target as HTMLElement).closest('.module__question-answer');

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
    <div className='module__question' data-active={question}>
      <p>Drop card study progress?</p>
      <div className='module__question-answer' data-answer='true' onClick={clickYes}>
        <span>Yes</span>
      </div>
      <div className='module__question-answer' data-answer='false'>
        <span>No</span>
      </div>
    </div>
  );
};

export default CardQuestion;
