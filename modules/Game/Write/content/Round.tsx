import { FC, MouseEvent, useEffect } from 'react';
import { useActions, useAppSelector } from '@store/hooks';

interface OwnProps {}

type Props = OwnProps;

const Round: FC<Props> = () => {
  const { next_write_round } = useActions();

  const {
    write: { answered, rounds, all_cards_num },
  } = useAppSelector(({ game }) => game);

  const correctAnswered = answered.filter(item => item.answer === 'correct').length;

  let correctRounds = 0;

  for (const round of rounds) {
    let correctRound = round.filter(item => item.answer === 'correct').length;
    correctRounds += correctRound;
  }

  const correctNum = correctAnswered + correctRounds;
  const incorrectNum = answered.filter(item => item.answer === 'incorrect').length;
  const roundCardsNum = answered.length;

  const roundNum = rounds.length + 1;

  const clickContinue = (e: MouseEvent<HTMLButtonElement>) => {
    next_write_round();
  };

  const keyDownContinue = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      next_write_round();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keyDownContinue);

    return () => {
      window.removeEventListener('keydown', keyDownContinue);
    };
  }, []);

  return (
    <div className='game__round'>
      <h1 className='game__round-title'>
        <span>Round </span>
        <span>{roundNum}</span>
      </h1>
      <div className='game__round-body'>
        <div className='game__score-field game__score-field--correct'>
          <span className='game__score-title'>Correct</span>
          <span className='game__score-number'>{correctAnswered}</span>
          <span className='game__score-percent'>
            {Math.round((correctAnswered / roundCardsNum) * 100)}%
          </span>
        </div>

        <div className='game__score-field game__score-field--incorrect'>
          <span className='game__score-title'>Incorrect</span>
          <span className='game__score-number'>{incorrectNum}</span>
          <span className='game__score-percent'>
            {Math.round((incorrectNum / roundCardsNum) * 100)}%
          </span>
        </div>

        <div className='game__score-field'>
          <span className='game__score-title'>Overall progress</span>
          <span className='game__score-number'>
            {correctNum}/{all_cards_num}
          </span>
          <span className='game__score-percent'>
            {Math.round((correctNum / all_cards_num) * 100)}%
          </span>
        </div>
      </div>

      <div className='game__round-continue'>
        <button
          //helpers-delete
          className='bcc-lightblue pad10-30 brr15 white fz15 fw-normal h-grey h-bcc-yellow'
          onClick={clickContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Round;
