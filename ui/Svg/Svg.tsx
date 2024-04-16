import React, { SVGAttributes, memo } from 'react';

type SvgProps = SVGAttributes<HTMLOrSVGElement> & {
  icon: string;
};

const Svg = ({ icon = '', ...rest }: SvgProps) => {
  return (
    <svg {...rest}>
      <use href={`../img/sprite.svg#icon__${icon}`}></use>
    </svg>
  );
};

export default memo(Svg);
