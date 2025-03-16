import { useAppSelector } from "@store/store";
import Skeleton from "@ui/Skeleton";
import React, { memo } from "react";

import ItemsNumber from "./components/ItemsNumber";
import Navigation from "./components/Navigation";
import s from "./styles.module.scss";

const Header = () => {
  const user = useAppSelector(s => s.auth.user);

  const { username } = user || {};

  return (
    <div className={s.header}>
      <div className={s.nickname}>
        <h1>{username ? username : <Skeleton width={250} />}</h1>
      </div>
      <Navigation />
      <ItemsNumber />
    </div>
  );
};

export default memo(Header);
