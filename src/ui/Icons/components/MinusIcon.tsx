import React, { memo, SVGProps } from "react";

type MinusIconProps = SVGProps<SVGSVGElement>;

const MinusIcon = (props: MinusIconProps) => (
  <svg
    {...props}
    viewBox="0 0 14 2"
    id="icon__minus"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M14 2H0V0H14V2Z" />
  </svg>
);

export default memo(MinusIcon);
