import { getIsGame } from "@helpers/functions/determinePath";
import { useAppSelector } from "@store/store";
import clsx from "clsx";
import { useRouter } from "next/router";
import { memo } from "react";

import s from "./styles.module.scss";

const Title = () => {
  const router = useRouter();

  const isGame = getIsGame(router.pathname);

  const user = useAppSelector((s) => s.auth.user);
  const header_width = useAppSelector((s) => s.dimen.header_width);

  return (
    <a className={s.link} href={user ? "/home/modules" : "/"}>
      <h1 className={clsx(s.title, isGame && s.hidden)}>
        {header_width > 620 ? "Flash Cards" : "FC"}
      </h1>
    </a>
  );
};

export default memo(Title);
