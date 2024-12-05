import React, { memo, SVGProps } from "react";

type UndoIconProps = SVGProps<SVGSVGElement>;

const UndoIcon = (props: UndoIconProps) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <path
      d="M5.636 18.364C6.47075 19.2011 7.46272 19.8649 8.55488 20.3172C9.64705 20.7696 10.8179 21.0016 12 21C16.9705 21 21 16.9705 21 12C21 7.0295 16.9705 3 12 3C9.515 3 7.265 4.0075 5.636 5.636C4.807 6.465 3 8.5 3 8.5"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
    />
    <path
      d="M3 4.5V8.5H7"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
    />
  </svg>
);

export default memo(UndoIcon);
