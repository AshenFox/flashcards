import { ControlButton } from "@modules/Game/components/Controls";
import { useGameCardsById } from "@modules/Game/hooks";
import { useGameStore } from "@modules/Game/store/gameStore";
import { memo, MouseEvent, useCallback } from "react";

const StartOver = () => {
  const prepareWrite = useGameStore(s => s.prepareWrite);
  const cardsById = useGameCardsById();

  const clickStartOver = useCallback(
    (_e: MouseEvent<HTMLButtonElement>) => prepareWrite(cardsById),
    [cardsById, prepareWrite],
  );

  return <ControlButton title="Start over" onClick={clickStartOver} />;
};

export default memo(StartOver);
