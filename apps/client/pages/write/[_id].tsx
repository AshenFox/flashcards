import { Write } from "@modules/Game";
import GameShell from "@modules/Game/GameShell";
import { memo } from "react";

const WritePage = () => {
  return (
    <GameShell mode="write">
      <Write />
    </GameShell>
  );
};

export default memo(WritePage);
