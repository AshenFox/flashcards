import { FC, MouseEvent } from 'react';
import {
  set_flashcards_shuffled,
  sort_flashcards,
  shuffle_flashcards,
  reset_flashcards_progress,
} from '../../../store/actions/gameActions';
import { useAppDispatch, useAppSelector } from '../../../store/store';

interface OwnProps {}

type Props = OwnProps;

const ShuffleBtn: FC<Props> = () => {
  const dispatch = useAppDispatch();

  const {
    flashcards: { shuffled },
  } = useAppSelector(({ game }) => game);

  const clickSuffle = (e: MouseEvent<HTMLButtonElement>) => {
    if (shuffled) {
      dispatch(sort_flashcards());
      dispatch(set_flashcards_shuffled(false));
    } else {
      dispatch(shuffle_flashcards());
      dispatch(set_flashcards_shuffled(true));
    }

    dispatch(reset_flashcards_progress());
  };

  return (
    <div className={`game__shuffle ${shuffled ? 'active' : ''}`}>
      <button
        className='btn width100 fz15 pad7 br2 brc-grey-medium brr15 lightblue h-yellow'
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
