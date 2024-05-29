import { ControlButton } from "@modules/Game/components/Controls";
import { useActions } from "@store/hooks";
import React, { memo, MouseEvent, useCallback } from "react";

const StartOver = () => {
  const { prepare_write } = useActions();

  const clickStartOver = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => prepare_write(),
    [prepare_write],
  );

  return <ControlButton title="Start over" onClick={clickStartOver} />;
};

export default memo(StartOver);
