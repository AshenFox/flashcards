import { noop } from "@helpers/functions/noop";
import { memo } from "react";

import Inner from "./components/Inner";
import { createClassName } from "./helpers";
import { ButtonProps } from "./types";

const Button = (props: ButtonProps) => {
  const { active = true, onClick, loading } = props;

  return (
    <button
      className={createClassName(props)}
      onClick={!active || loading ? noop : onClick}
      data-tooltip-id={props.id}
    >
      <Inner {...props} />
    </button>
  );
};

export default memo(Button);
