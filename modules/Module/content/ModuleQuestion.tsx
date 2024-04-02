import { FC, useEffect, useRef, MouseEvent as ReactMouseEvent } from 'react';
import { useActions, useAppSelector } from '../../../store/hooks';

interface OwnProps {}

type Props = OwnProps;

const ModuleQuestion: FC<Props> = () => {
  const { set_module_question, drop_cards_sr } = useActions();

  const { module } = useAppSelector(({ main }) => main);

  const { question } = module || {};

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
      if (questionAnswerEl) set_module_question(false);
    } else {
      set_module_question(false);
    }
  });

  const clickYes = (e: ReactMouseEvent<HTMLDivElement>) => drop_cards_sr();

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

export default ModuleQuestion;
