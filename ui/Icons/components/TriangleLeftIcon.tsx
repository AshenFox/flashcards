import React, { SVGProps, memo } from 'react';

type TriangleLeftIconProps = SVGProps<SVGSVGElement>;

const TriangleLeftIcon = (props: TriangleLeftIconProps) => (
  <svg
    {...props}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 490.661 490.661'
    id='icon__triangle_left'
  >
    <path d='M453.331 1.424a10.738 10.738 0 0 0-10.688 0L37.309 236.091c-3.285 1.92-5.312 5.44-5.312 9.237s2.027 7.317 5.312 9.237l405.333 234.667a10.662 10.662 0 0 0 5.355 1.429 10.58 10.58 0 0 0 5.333-1.429 10.681 10.681 0 0 0 5.333-9.237V10.661a10.678 10.678 0 0 0-5.332-9.237z'></path>
  </svg>
);

export default memo(TriangleLeftIcon);
