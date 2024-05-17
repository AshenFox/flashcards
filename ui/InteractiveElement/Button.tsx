import { noop } from "@helpers/functions/noop";
import { memo } from "react";

import { createClassName } from "./helpers";
import Inner from "./Inner";
import { ButtonProps } from "./types";

const Button = (props: ButtonProps) => {
  const { active = true, onClick } = props;

  return (
    <button
      className={createClassName(props)}
      onClick={active ? onClick : noop}
    >
      <Inner {...props} />
    </button>
  );
};

export default memo(Button);
