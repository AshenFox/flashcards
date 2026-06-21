import { noop } from "@helpers/functions/noop";
import { Tooltip } from "@ui/Tooltip";
import { memo } from "react";

import Inner from "./components/Inner";
import { createClassName } from "./helpers";
import { ButtonProps } from "./types";

const Button = (props: ButtonProps) => {
  const { active = true, onClick, loading, tooltip, tooltipSide } = props;

  return (
    <Tooltip content={tooltip} side={tooltipSide}>
      <button
        className={createClassName(props)}
        onClick={!active || loading ? noop : onClick}
      >
        <Inner {...props} />
      </button>
    </Tooltip>
  );
};

export default memo(Button);
