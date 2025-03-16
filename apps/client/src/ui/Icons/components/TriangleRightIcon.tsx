import React, { memo, SVGProps } from "react";

type TriangleRightIconProps = SVGProps<SVGSVGElement>;

const TriangleRightIcon = (props: TriangleRightIconProps) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 490.661 490.661"
    id="icon__triangle_right"
  >
    <path d="M453.352 236.091L48.019 1.424c-3.285-1.899-7.36-1.899-10.688 0a10.681 10.681 0 0 0-5.333 9.237v469.333c0 3.819 2.048 7.339 5.333 9.237a10.802 10.802 0 0 0 5.333 1.429c1.856 0 3.691-.469 5.355-1.429l405.333-234.667c3.285-1.92 5.312-5.44 5.312-9.237s-2.027-7.338-5.312-9.236z"></path>
  </svg>
);

export default memo(TriangleRightIcon);
