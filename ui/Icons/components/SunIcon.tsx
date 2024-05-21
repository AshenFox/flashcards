import React, { memo, SVGProps } from "react";

type SunIconProps = SVGProps<SVGSVGElement>;

const SunIcon = (props: SunIconProps) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    stroke="var(--icon-fill)"
    xmlns="http://www.w3.org/2000/svg"
    id="icon__sun"
  >
    <path
      d="M8 22H16"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M5 19H19"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2 16H22"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10 6.34141C10.6256 6.12031 11.2987 6 12 6C15.3137 6 18 8.68629 18 12C18 13.5217 17.4335 14.911 16.5 15.9687H7.5C6.56645 14.911 6 13.5217 6 12C6 11.2987 6.12031 10.6256 6.34141 10"
      stroke-width="1.5"
      stroke-linecap="round"
      fill="none"
    />
    <path d="M12 2V3" stroke-width="1.5" stroke-linecap="round" />
    <path d="M22 12L21 12" stroke-width="1.5" stroke-linecap="round" />
    <path d="M3 12L2 12" stroke-width="1.5" stroke-linecap="round" />
    <path
      d="M19.0708 4.92969L18.678 5.32252"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <path
      d="M5.32178 5.32227L4.92894 4.92943"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
);

export default memo(SunIcon);
