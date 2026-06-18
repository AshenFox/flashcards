import { ControlButton } from "@modules/Game/components/Controls";
import { useGameCardsById } from "@modules/Game/hooks";
import { useGameStore } from "@modules/Game/store/gameStore";
import { ShuffleIcon } from "@ui/Icons";
import { memo, MouseEvent } from "react";

const ShuffleBtn = () => {
  const setFlashcardsShuffled = useGameStore(s => s.setFlashcardsShuffled);
  const resetFlashcardsProgress = useGameStore(s => s.resetFlashcardsProgress);
  const shuffleOrder = useGameStore(s => s.shuffleOrder);
  const sortOrder = useGameStore(s => s.sortOrder);
  const cardsById = useGameCardsById();
  const shuffled = useGameStore(s => s.flashcards.shuffled);

  const clickShuffle = (_e: MouseEvent<HTMLButtonElement>) => {
    if (shuffled) {
      sortOrder(cardsById);
      setFlashcardsShuffled(false);
    } else {
      shuffleOrder(cardsById);
      setFlashcardsShuffled(true);
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
