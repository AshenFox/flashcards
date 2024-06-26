import React, { memo, SVGProps } from "react";

type MenuIconProps = SVGProps<SVGSVGElement>;

const MenuIcon = (props: MenuIconProps) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 469.333 469.333"
    id="icon__menu"
  >
    <path d="M53.333 106.667H416c29.417 0 53.333-23.927 53.333-53.333S445.417 0 416 0H53.333C23.917 0 0 23.927 0 53.333s23.917 53.334 53.333 53.334zM416 181.333H53.333C23.917 181.333 0 205.26 0 234.667S23.917 288 53.333 288H416c29.417 0 53.333-23.927 53.333-53.333S445.417 181.333 416 181.333zm0 181.334H53.333C23.917 362.667 0 386.594 0 416s23.917 53.333 53.333 53.333H416c29.417 0 53.333-23.927 53.333-53.333S445.417 362.667 416 362.667z"></path>
  </svg>
);

export default memo(MenuIcon);
