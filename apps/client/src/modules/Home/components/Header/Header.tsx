import Skeleton from "@ui/Skeleton";
import { useAuthStore } from "@zustand/auth";
import React, { memo } from "react";

import ItemsNumber from "./components/ItemsNumber";
import Navigation from "./components/Navigation";
import s from "./styles.module.scss";

const Header = () => {
  const username = useAuthStore(s => s.user?.username);

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
