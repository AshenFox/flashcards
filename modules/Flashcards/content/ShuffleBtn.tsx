import { FC, MouseEvent } from 'react';
import { useActions, useAppSelector } from '../../../store/hooks';

interface OwnProps {}

type Props = OwnProps;

const ShuffleBtn: FC<Props> = () => {
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
        <svg height='20' width='20'>
          <use href='../img/sprite.svg#icon__shuffle'></use>
        </svg>
        <span>Shuffle</span>
      </button>
    </div>
  );
};

export default ShuffleBtn;
