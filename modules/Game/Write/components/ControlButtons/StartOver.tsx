import { useActions } from "@store/hooks";
import React, { memo, MouseEvent, useCallback } from "react";

const StartOver = () => {
  const { prepare_write } = useActions();

  const clickStartOver = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => prepare_write(),
    [prepare_write],
  );

  return (
    <div>
      <button
        //helpers-delete
        className="width100 fz15 pad7 br2 brc-grey-medium brr15 lightblue h-red h-brc-red"
        onClick={clickStartOver}
      >
        <span>Start over</span>
      </button>
    </div>
  );
};

export default memo(StartOver);
