import { Flashcards } from "@modules/Game";
import GameShell from "@modules/Game/GameShell";
import { memo } from "react";

const FlashcardsPage = () => {
  return (
    <GameShell mode="flashcards">
      <Flashcards />
    </GameShell>
  );
};

export default memo(FlashcardsPage);
