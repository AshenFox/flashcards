import React, { FC } from 'react';
import { useAppSelector } from '../../../store/hooks';

interface OwnProps {}

type Props = OwnProps;

const Progress: FC<Props> = () => {
  const {
    write: { remaining, answered, rounds, all_cards_num },
  } = useAppSelector(({ game }) => game);

  const correctAnswered = answered.filter((item) => item.answer === 'correct').length;

  let correctRounds = 0;
  for (const round of rounds) {
    let correctRound = round.filter((item) => item.answer === 'correct').length;
    correctRounds += correctRound;
  }

  const remainingNum = remaining.length;
  const correctNum = correctAnswered + correctRounds;
  const incorrectNum = answered.filter((item) => item.answer === 'incorrect').length;

  return (
    <div className='game__progress'>
      <div className='game__progress-item'>
        <div className='game__progress-bar full' id='bar-remaining'>
          <div
            className='game__bar-fill'
            style={{ width: `${(remainingNum / all_cards_num) * 100}%` }}
            id='fill-remaining'
          ></div>
        </div>
        <div className='game__progress-info'>
          <div className='game__progress-title show'>
            <span>remaining</span>
          </div>

          <div className='game__progress-count'>
            <span id='count-remaining'>{remainingNum}</span>
          </div>
        </div>
      </div>

      <div className='game__progress-item'>
        <div className='game__progress-bar full red' id='bar-incorrect'>
          <div
            className='game__bar-fill red'
            style={{ width: `${(incorrectNum / all_cards_num) * 100}%` }}
            id='fill-incorrect'
          ></div>
        </div>
        <div className='game__progress-info'>
          <div className='game__progress-title show'>
            <span>incorrect</span>
          </div>

          <div className='game__progress-count'>
            <span id='count-incorrect'>{incorrectNum}</span>
          </div>
        </div>
      </div>

      <div className='game__progress-item'>
        <div className='game__progress-bar full green' id='bar-correct'>
          <div
            className='game__bar-fill green'
            style={{ width: `${(correctNum / all_cards_num) * 100}%` }}
            id='fill-correct'
          ></div>
        </div>
        <div className='game__progress-info'>
          <div className='game__progress-title show'>
            <span>correct</span>
          </div>

          <div className='game__progress-count'>
            <span id='count-correct'>{correctNum}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
