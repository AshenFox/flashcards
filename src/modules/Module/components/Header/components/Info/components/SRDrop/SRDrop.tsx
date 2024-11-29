import { useActions, useAppSelector } from "@store/hooks";
import { DropStudyRegimeIcon } from "@ui/Icons";
import Tooltip, { tooltipContainer } from "@ui/Tooltip";
import clsx from "clsx";
import { memo, MouseEvent } from "react";

import s from "./styles.module.scss";

const SRDrop = () => {
  const { set_module_question } = useActions();

  const currentModule = useAppSelector(s => s.main.module);

  const { question } = currentModule || {};

  const clickDropSR = (e: MouseEvent<HTMLDivElement>) =>
    set_module_question(true);

  return (
    <div
      className={clsx(s.drop, tooltipContainer, {
        [s.active]: question,
      })}
      onClick={clickDropSR}
    >
      <DropStudyRegimeIcon width="30" height="30" />
      <Tooltip>Drop all cards study progress</Tooltip>
    </div>
  );
};

export default memo(SRDrop);
