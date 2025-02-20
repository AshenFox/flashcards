import { ControlButton } from "@modules/Game/components/Controls";
import { useActions } from "@store/hooks";
import React, { memo, MouseEvent, useCallback } from "react";

const StartOver = () => {
  const { prepareWrite } = useActions();

  const clickStartOver = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => prepareWrite(),
    [prepareWrite],
  );

  return <ControlButton title="Start over" onClick={clickStartOver} />;
};

export default memo(StartOver);
