import { memo } from 'react';
import { useAppSelector } from '@store/hooks';
import Results, { ResultItem } from '@modules/Game/components/Results';

const Finish = () => {
  const answers = useAppSelector(s => s.game.flashcards.answers);

  const correctNum = answers.filter(item => item.answer === 'correct').length;

  return (
    <Results title={'Results'} progress={correctNum} all={answers.length}>
      {answers.map((data, i) => (
        <ResultItem data={data} number={i + 1} key={data.id} />
      ))}
    </Results>
  );
};

export default memo(Finish);
