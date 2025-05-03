import { getIsGame, getIsSR } from "@helpers/functions/determinePath";
import { useAppSelector } from "@store/store";
import { GameBackIcon } from "@ui/Icons";
import { useRouter } from "next/router";
import { memo } from "react";

import Item from "./components/Item";
import Logo from "./components/Logo";
import s from "./styles.module.scss";

const Left = () => {
  const router = useRouter();
  const { _id } = router.query;

  const isSR = getIsSR(_id);
  const isGame = getIsGame(router.pathname);

  const loading = useAppSelector(s => s.auth.loading);

  return (
    <div className={s.left}>
      {isGame && (
        <Item
          href={isSR ? "/home/sr" : `/module/${_id}`}
          icon={<GameBackIcon />}
          iconSize={25}
          className={s.back}
          active={!loading}
        />
      )}

      <Logo />
    </div>
  );
};

export default memo(Left);
