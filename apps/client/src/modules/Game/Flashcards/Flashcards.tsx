import { CardsIcon } from "@ui/Icons";
import { memo } from "react";

import Controls, { ControlButtons } from "../components/Controls";
import { useGameRouteParams } from "../hooks";
import Content from "./components/Content";
import { EndGameBtn, ShuffleBtn } from "./components/ControlButtons";
import Progress from "./components/Progress";

const Flashcards = () => {
  const { isSR } = useGameRouteParams();

  return (
    <>
      <Controls
        title="Flashcards"
        titleIcon={<CardsIcon height="40" width="40" />}
      >
        <Progress />
        <ControlButtons>
          {!isSR && <ShuffleBtn />}
          <EndGameBtn />
        </ControlButtons>
      </Controls>
      <Content />
    </>
  );
};

export default memo(Flashcards);
