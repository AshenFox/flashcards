import React, { memo, SVGProps } from "react";

type FilterIconProps = SVGProps<SVGSVGElement>;

const FilterIcon = (props: FilterIconProps) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 30 30"
    id="icon__filter"
  >
    <path
      d="M6.25 5H23.75L17.5 13.125V25L12.5 20V13.125L6.25 5Z"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default memo(FilterIcon);
