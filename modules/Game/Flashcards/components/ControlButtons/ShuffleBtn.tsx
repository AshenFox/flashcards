import { ControlButton } from "@modules/Game/components/Controls";
import { useActions, useAppSelector } from "@store/hooks";
import { ShuffleIcon } from "@ui/Icons";
import { memo, MouseEvent } from "react";

const ShuffleBtn = () => {
  const {
    set_flashcards_shuffled,
    sort_flashcards,
    shuffle_flashcards,
    reset_flashcards_progress,
  } = useActions();

  const shuffled = useAppSelector(s => s.game.flashcards.shuffled);

  const clickShuffle = (e: MouseEvent<HTMLButtonElement>) => {
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
    <ControlButton
      icon={<ShuffleIcon height="20" width="20" />}
      title="Shuffle"
      active={shuffled}
      onClick={clickShuffle}
    />
  );
};

export default memo(ShuffleBtn);
