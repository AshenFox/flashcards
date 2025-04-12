import React, { memo, SVGProps } from "react";

type FilterIconProps = SVGProps<SVGSVGElement>;

const FilterIcon = (props: FilterIconProps) => (
  <svg
    {...props}
    viewBox="0 0 16 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    id="icon__filter"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.10287 0.558248C0.271164 0.216466 0.619038 0 1.00001 0H15C15.381 0 15.7289 0.216466 15.8971 0.558248C16.0654 0.90003 16.0249 1.30775 15.7926 1.60971L11 7.84012V17C11 17.4045 10.7564 17.7691 10.3827 17.9239C10.009 18.0787 9.5789 17.9931 9.2929 17.7071L5.2929 13.7071C5.10536 13.5196 5.00001 13.2652 5.00001 13V7.84012L0.207383 1.60971C-0.0248981 1.30775 -0.0654242 0.90003 0.10287 0.558248ZM3.03087 2L6.79263 6.89029C6.9271 7.0651 7.00001 7.27946 7.00001 7.5V12.5858L9.00001 14.5858V7.5C9.00001 7.27946 9.07291 7.0651 9.20738 6.89029L12.9691 2H3.03087Z"
    />
  </svg>
);

export default memo(FilterIcon);
