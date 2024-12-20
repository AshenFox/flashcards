import { useAppSelector } from "@store/store";
import { useRouter } from "next/router";
import React, { memo } from "react";

import s from "./styles.module.scss";

const ItemsNumber = () => {
  const router = useRouter();
  const { section } = router.query;

  const all_modules_number = useAppSelector(s => s.main.homeModules.data.all);
  const all_cards_number = useAppSelector(s => s.main.all_cards_number);

  return (
    <div className={s.number}>
      {section === "cards" &&
        `All cards: ${all_cards_number ? all_cards_number : "0"}`}
      {section === "modules" &&
        `All modules: ${all_modules_number ? all_modules_number : "0"}`}
    </div>
  );
};

export default memo(ItemsNumber);
