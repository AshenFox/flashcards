import React, { memo, SVGProps } from "react";

type PlusIconProps = SVGProps<SVGSVGElement>;

const PlusIcon = (props: PlusIconProps) => (
  <svg
    {...props}
    viewBox="0 0 14 14"
    id="icon__plus"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" />
  </svg>
);

export default memo(PlusIcon);
