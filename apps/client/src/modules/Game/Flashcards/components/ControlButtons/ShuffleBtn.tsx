import { ControlButton } from "@modules/Game/components/Controls";
import { useActions, useAppSelector } from "@store/hooks";
import { ShuffleIcon } from "@ui/Icons";
import { memo, MouseEvent } from "react";

const ShuffleBtn = () => {
  const {
    shuffleFlashcards,
    sortFlashcards,
    setFlashcardsShuffled,
    resetFlashcardsProgress,
  } = useActions();

  const shuffled = useAppSelector(s => s.game.flashcards.shuffled);

  const clickShuffle = (e: MouseEvent<HTMLButtonElement>) => {
    if (shuffled) {
      sortFlashcards();
      setFlashcardsShuffled({ value: false });
    } else {
      shuffleFlashcards();
      setFlashcardsShuffled({ value: true });
    }

    resetFlashcardsProgress();
  };

  return (
    <ControlButton
      icon={<ShuffleIcon height="20" width="20" />}
      title="Shuffle"
      active={shuffled}
      onClick={clickShuffle}
    />
  );
};

export default memo(ShuffleBtn);
