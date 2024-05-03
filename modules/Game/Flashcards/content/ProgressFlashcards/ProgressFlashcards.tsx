import { memo } from 'react';
import { useAppSelector } from '@store/hooks';
import ProgressBar from '@ui/ProgressBar';
import Progress, { ProgressItem } from '@modules/Game/components/Progress';
import s from './styles.module.scss';

const ProgressFlashcards = () => {
  const {
    main: { cards },
    game: {
      flashcards: { progress },
    },
  } = useAppSelector(state => state);

  const cards_arr = Object.keys(cards);

  return (
    <Progress>
      <ProgressItem>
        <ProgressBar
          progress={progress}
          complete={cards_arr.length}
          title={'progress'}
          showComplete
          className={s.progress_bar}
        />
      </ProgressItem>
    </Progress>
  );
};

export default memo(ProgressFlashcards);
