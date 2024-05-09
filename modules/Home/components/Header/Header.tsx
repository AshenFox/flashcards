import { useAppSelector } from "@store/store";
import React, { memo } from "react";
import Skeleton from "react-loading-skeleton";

import ItemsNumber from "./components/ItemsNumber";
import Navigation from "./components/Navigation";
import s from "./styles.module.scss";

const Headers = () => {
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

export default memo(Headers);
