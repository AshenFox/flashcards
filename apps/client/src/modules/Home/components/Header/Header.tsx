import { useAppSelector } from "@store/store";
import Skeleton from "@ui/Skeleton";
import React, { memo } from "react";

import ItemsNumber from "./components/ItemsNumber";
import Navigation from "./components/Navigation";
import s from "./styles.module.scss";

const Header = () => {
  const username = useAppSelector(s => s.auth.user?.username);

  return (
    <div className={s.header}>
      <div className={s.nickname}>
        <h1>{username ? username : <Skeleton width={"25rem"} />}</h1>
      </div>
      <Navigation />
      <ItemsNumber />
    </div>
  );
};

export default memo(Header);
