import React, { memo, SVGProps } from "react";

type ArrowUpIconProps = SVGProps<SVGSVGElement>;

const ArrowUpIcon = (props: ArrowUpIconProps) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 490 490"
    id="icon__arrow_up"
  >
    <path d="M490,474.459H0L245.009,15.541L490,474.459z" />
  </svg>
);

export default memo(ArrowUpIcon);
