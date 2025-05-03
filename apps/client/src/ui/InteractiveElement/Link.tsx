import NextLink from "next/link";
import { useRouter } from "next/router";
import { memo, MouseEvent, useCallback } from "react";

import Inner from "./components/Inner";
import { createClassName } from "./helpers";
import { LinkProps } from "./types";

const Link = (props: LinkProps) => {
  const { active = true, href = "/", isReturn = false } = props;

  const router = useRouter();

  const onClickReturn = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (isReturn || !active) e.preventDefault();
      if (isReturn) router.back();
    },
    [active, router, isReturn],
  );

  return (
    <NextLink
      className={createClassName(props)}
      href={href}
      onClick={isReturn ? onClickReturn : undefined}
    >
      <Inner {...props} />
    </NextLink>
  );
};

export default memo(Link);
