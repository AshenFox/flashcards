import { MouseEvent, memo } from 'react';
import { useActions, useAppSelector } from '@store/hooks';
import { ShuffleIcon } from '@ui/Icons';

const ShuffleBtn = () => {
  const {
    set_flashcards_shuffled,
    sort_flashcards,
    shuffle_flashcards,
    reset_flashcards_progress,
  } = useActions();

  const {
    flashcards: { shuffled },
  } = useAppSelector(({ game }) => game);

  const clickSuffle = (e: MouseEvent<HTMLButtonElement>) => {
    if (shuffled) {
      sort_flashcards();
      set_flashcards_shuffled(false);
    } else {
      shuffle_flashcards();
      set_flashcards_shuffled(true);
    }

    reset_flashcards_progress();
  };

  return (
    <div className={`game__shuffle ${shuffled ? 'active' : ''}`}>
      <button
        //helpers-delete
        className='width100 fz15 pad7 br2 brc-grey-medium brr15 lightblue h-yellow'
        onClick={clickSuffle}
      >
        <ShuffleIcon height='20' width='20' />
        <span>Shuffle</span>
      </button>
    </div>
  );
};

export default memo(ShuffleBtn);
