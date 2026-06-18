import { getIsGame } from "@helpers/functions/determinePath";
import { useAuthStore } from "@store/auth";
import LogoIcon from "@ui/Icons/components/LogoIcon";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";

import s from "./styles.module.scss";

const Logo = () => {
  const router = useRouter();

  const isGame = getIsGame(router.pathname);

  const user = useAuthStore(s => s.user);

  return (
    <Link
      className={clsx(s.logo, isGame && s.isGame)}
      href={user ? "/home/modules" : "/"}
    >
      <LogoIcon />
    </Link>
  );
};

export default memo(Logo);
