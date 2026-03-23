import { ControlButton } from "@modules/Game/components/Controls";
import { useActions, useAppSelector } from "@store/hooks";
import { memo, MouseEvent } from "react";

const EndGameBtn = () => {
  const { endFlashcardsEarly } = useActions();

  const progress = useAppSelector(s => s.game.flashcards.progress);
  const ended_early = useAppSelector(s => s.game.flashcards.ended_early);
  const cards = useAppSelector(s => s.main.cards);
  const length = Object.values(cards).length;
  const isAtEnd = length === progress || ended_early;

  const clickEndGame = (_e: MouseEvent<HTMLButtonElement>) => {
    endFlashcardsEarly();
  };

  if (isAtEnd) return null;

  return <ControlButton title="End game" onClick={clickEndGame} />;
};

export default memo(EndGameBtn);
