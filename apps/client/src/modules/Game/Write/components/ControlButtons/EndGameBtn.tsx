import { ControlButton } from "@modules/Game/components/Controls";
import { useActions, useAppSelector } from "@store/hooks";
import { memo, MouseEvent } from "react";

const EndGameBtn = () => {
  const { endWriteEarly } = useActions();

  const is_init = useAppSelector(s => s.game.write.is_init);
  const remaining = useAppSelector(s => s.game.write.remaining);
  const answered = useAppSelector(s => s.game.write.answered);
  const ended_early = useAppSelector(s => s.game.write.ended_early);

  const isGameFinished =
    !remaining.length &&
    !answered.filter(item => item.answer === "incorrect").length &&
    is_init;
  const isAtEnd = isGameFinished || ended_early;

  const clickEndGame = (e: MouseEvent<HTMLButtonElement>) => {
    endWriteEarly();
  };

  if (isAtEnd) return null;

  return <ControlButton title="End game" onClick={clickEndGame} />;
};

export default memo(EndGameBtn);
