import React, { memo, SVGProps } from "react";

type DeleteIconProps = SVGProps<SVGSVGElement>;

const DeleteIcon = (props: DeleteIconProps) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 612.002 612.002"
    id="icon__delete"
  >
    <path d="M540.346 19.437H389.4C388.323 8.529 379.114 0 367.917 0H244.084c-11.201 0-20.405 8.529-21.489 19.437H71.655c-11.93 0-21.599 9.669-21.599 21.602v41.036c0 11.934 9.669 21.6 21.599 21.6h468.691c11.93 0 21.599-9.667 21.599-21.6V41.04c0-11.934-9.669-21.603-21.599-21.603zM95.34 590.403c0 11.923 9.665 21.599 21.599 21.599h378.127c11.934 0 21.599-9.674 21.599-21.599V145.167H95.34v445.236z"></path>
  </svg>
);

export default memo(DeleteIcon);
