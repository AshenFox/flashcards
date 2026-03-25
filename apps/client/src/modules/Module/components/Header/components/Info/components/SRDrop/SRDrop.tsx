import { DropStudyRegimeIcon } from "@ui/Icons";
import Tooltip from "@ui/Tooltip";
import clsx from "clsx";
import { memo, MouseEvent } from "react";

import s from "./styles.module.scss";

type SRDropProps = {
  moduleId: string | undefined;
  question: boolean;
  onActivate: () => void;
};

const SRDrop = ({ moduleId, question, onActivate }: SRDropProps) => {
  const clickDropSR = (_e: MouseEvent<HTMLDivElement>) => onActivate();

  return (
    <div
      data-tooltip-id={`drop-sr-module-${moduleId}`}
      className={clsx(s.drop, {
        [s.active]: question,
      })}
      onClick={clickDropSR}
    >
      <DropStudyRegimeIcon width="25" height="25" />
      <Tooltip id={`drop-sr-module-${moduleId}`}>
        Drop all cards study progress
      </Tooltip>
    </div>
  );
};

export default memo(SRDrop);
