import { FC, ReactElement } from 'react';
import DateStr from './DateSrt';

interface OwnProps {
  data: {
    stage: number;
    nextRep: string;
    prevStage: string;
  };
  classStr?: string;
}

type Props = OwnProps;

const SRIngicator: FC<Props> = ({ data, classStr }) => {
  const { stage, nextRep, prevStage } = data;

  const full = 360;
  const num = 11;
  const part = full / num;
  let angle = 120;

  const radius = 2;
  const diameter = radius * 2;

  const dots: ReactElement[] = [];

  for (let i = 1; i <= stage; i++) {
    angle = angle - part;
    let x = 0 + radius * Math.cos((-angle * Math.PI) / 180);
    let y = 0 + radius * Math.sin((-angle * Math.PI) / 180);

    let x_percent = ((x + radius) / diameter) * 100;
    let y_percent = ((y + radius) / diameter) * 100;

    dots.push(
      <div
        key={angle}
        className='sr-indicator__dot'
        style={{
          top: `${y_percent}%`,
          left: `${x_percent}%`,
          backgroundColor: color_arr[i - 1],
          boxShadow: `0 0 0.15rem 0 ${color_arr[i - 1]}`,
        }}
      />
    );
  }

  return (
    <div className={`sr-indicator ${classStr}`}>
      <svg>
        <use href='../img/sprite.svg#icon__studyregime'></use>
      </svg>
      <div className='sr-indicator__tooltip'>
        <span>SR Stage: {stage}</span>
        <span>
          Next repeat: <DateStr date={nextRep} />
        </span>
        <span>
          Drop stage: <DateStr date={prevStage} />
        </span>
      </div>
      <div className='sr-indicator__dots'>{dots}</div>
    </div>
  );
};

export default SRIngicator;

const color_arr = [
  '#0000dc',
  '#00817d',
  '#238e24',
  '#afd510',
  '#fce72c',
  '#ffca2c',
  '#fc7300',
  '#f32a00',
  '#da0000',
  '#b10067',
  '#54267b',
];
