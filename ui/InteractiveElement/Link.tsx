import NextLink from "next/link";
import { memo } from "react";

import { createClassName } from "./helpers";
import Inner from "./Inner";
import { LinkProps } from "./types";

const Link = (props: LinkProps) => {
  const { active = true, href } = props;

  return (
    <NextLink className={createClassName(props)} href={active ? href : ""}>
      <Inner {...props} />
    </NextLink>
  );
};

export default memo(Link);
