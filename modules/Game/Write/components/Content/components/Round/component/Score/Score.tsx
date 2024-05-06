import React, { memo } from 'react';
import s from './styles.module.scss';
import clsx from 'clsx';

type ScoreProps = {
  progress: number;
  all: number;
  title: string;
  result?: 'correct' | 'incorrect';
  displayAll?: boolean;
};

const Score = ({ progress, all, title, result, displayAll }: ScoreProps) => {
  return (
    <div className={clsx(s.score, result && s[result])}>
      <span className={s.title}>{title}</span>
      <span className={s.number}>
        {progress}
        {displayAll && `/${all}`}
      </span>
      <span className={s.percent}>{Math.round((progress / all) * 100)}%</span>
    </div>
  );
};

export default memo(Score);
