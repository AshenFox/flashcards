import React, { SVGProps, memo } from 'react';

type ImgIconProps = SVGProps<SVGSVGElement>;

const ImgIcon = (props: ImgIconProps) => (
  <svg
    {...props}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 426.667 426.667'
    id='icon__img'
  >
    <path d='M42.667 85.333H0V384c0 23.573 19.093 42.667 42.667 42.667h298.667V384H42.667V85.333z'></path>
    <path d='M384 0H128c-23.573 0-42.667 19.093-42.667 42.667v256c0 23.573 19.093 42.667 42.667 42.667h256c23.573 0 42.667-19.093 42.667-42.667v-256C426.667 19.093 407.573 0 384 0zM128 298.667l64-85.333 43.307 57.813L298.667 192 384 298.667H128z'></path>
  </svg>
);

export default memo(ImgIcon);
