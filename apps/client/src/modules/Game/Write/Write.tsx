import { useGameRouteParams } from "@modules/Game/hooks";
import { WriteIcon } from "@ui/Icons";
import { memo } from "react";

import Controls, { ControlButtons } from "../components/Controls";
import Content from "./components/Content";
import { EndGameBtn, StartOver } from "./components/ControlButtons";
import Progress from "./components/Progress";

const Write = () => {
  const { isSR } = useGameRouteParams();

  return (
    <>
      <Controls title="Write" titleIcon={<WriteIcon height="40" width="40" />}>
        <Progress />
        <ControlButtons>
          {!isSR && <StartOver />}
          <EndGameBtn />
        </ControlButtons>
      </Controls>
      <Content />
    </>
  );
};

export default memo(Write);
