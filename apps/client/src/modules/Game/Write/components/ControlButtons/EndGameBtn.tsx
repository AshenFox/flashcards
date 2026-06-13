import { ControlButton } from "@modules/Game/components/Controls";
import { useGameStore } from "@modules/Game/store/gameStore";
import { memo, MouseEvent } from "react";

const EndGameBtn = () => {
  const endWriteEarly = useGameStore(s => s.endWriteEarly);
  const is_init = useGameStore(s => s.write.is_init);
  const remaining = useGameStore(s => s.write.remaining);
  const answered = useGameStore(s => s.write.answered);
  const ended_early = useGameStore(s => s.write.ended_early);

  const isGameFinished =
    !remaining.length &&
    !answered.filter(item => item.answer === "incorrect").length &&
    is_init;
  const isAtEnd = isGameFinished || ended_early;

  const clickEndGame = (_e: MouseEvent<HTMLButtonElement>) => {
    endWriteEarly();
  };

  if (isAtEnd) return null;

  return <ControlButton title="End game" onClick={clickEndGame} />;
};

export default memo(EndGameBtn);
