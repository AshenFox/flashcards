import { ControlButton } from "@modules/Game/components/Controls";
import { useGameOrderLength } from "@modules/Game/hooks";
import { useGameStore } from "@modules/Game/store/gameStore";
import { memo, MouseEvent } from "react";

const EndGameBtn = () => {
  const endFlashcardsEarly = useGameStore(s => s.endFlashcardsEarly);
  const progress = useGameStore(s => s.flashcards.progress);
  const ended_early = useGameStore(s => s.flashcards.ended_early);
  const length = useGameOrderLength();
  const isAtEnd = length === progress || ended_early;

  const clickEndGame = (_e: MouseEvent<HTMLButtonElement>) => {
    endFlashcardsEarly();
  };

  if (isAtEnd) return null;

  return <ControlButton title="End game" onClick={clickEndGame} />;
};

export default memo(EndGameBtn);
