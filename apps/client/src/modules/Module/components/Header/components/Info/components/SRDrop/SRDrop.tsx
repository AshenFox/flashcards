import { useActions, useAppSelector } from "@store/hooks";
import { DropStudyRegimeIcon } from "@ui/Icons";
import Tooltip from "@ui/Tooltip";
import clsx from "clsx";
import { memo, MouseEvent } from "react";

import s from "./styles.module.scss";

const SRDrop = () => {
  const { setModuleQuestion } = useActions();

  const question = useAppSelector(s => s.main.module?.question);
  const _id = useAppSelector(s => s.main.module?._id);

  const clickDropSR = (e: MouseEvent<HTMLDivElement>) =>
    setModuleQuestion({ value: true });

  return (
    <div
      data-tooltip-id={`drop-sr-module-${_id}`}
      className={clsx(s.drop, {
        [s.active]: question,
      })}
      onClick={clickDropSR}
    >
      <DropStudyRegimeIcon width="25" height="25" />
      <Tooltip id={`drop-sr-module-${_id}`}>
        Drop all cards study progress
      </Tooltip>
    </div>
  );
};

export default memo(SRDrop);
