import React, { memo, SVGProps } from "react";

type DropStudyRegimeIconProps = SVGProps<SVGSVGElement>;

const DropStudyRegimeIcon = (props: DropStudyRegimeIconProps) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    id="icon__drop_studyregime"
  >
    <rect y="206" width="512" height="100" />
    <rect x="361" y="336" width="30" height="161" />
    <rect x="121" y="336" width="30" height="161" />
    <rect x="241" y="336" width="30" height="176" />
    <rect x="181" y="336" width="30" height="139" />
    <rect x="301" y="336" width="30" height="117" />
    <polygon points="191,0 178.975,0 121,69.569 121,70 191,70  " />
    <polygon points="391,0 221,0 221,100 121,100 121,176 391,176  " />
  </svg>
);

export default memo(DropStudyRegimeIcon);
