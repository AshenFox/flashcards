import React, { memo, SVGProps } from "react";

type NewModuleIconProps = SVGProps<SVGSVGElement>;

const NewModuleIcon = (props: NewModuleIconProps) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 55 55"
    id="icon__new_module"
  >
    <path d="M49 8.5v-8H0v47h7v7h48v-46h-6zm-47 37v-43h45v6H7v37H2zm51 7H9v-42h44v42z"></path>
    <path d="M42 30.5H32v-10a1 1 0 1 0-2 0v10H20a1 1 0 1 0 0 2h10v10a1 1 0 1 0 2 0v-10h10a1 1 0 1 0 0-2z"></path>
  </svg>
);

export default memo(NewModuleIcon);
