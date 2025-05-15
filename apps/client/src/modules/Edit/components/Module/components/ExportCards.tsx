import { useActions, useAppSelector } from "@store/hooks";
import { Button } from "@ui/InteractiveElement";
import { memo } from "react";

import s from "./styles.module.scss";

const ExportCards = () => {
  const { exportSelectedCards } = useActions();
  const cards = useAppSelector(s => s.main.cards);

  const active = Object.values(cards).some(card => card.save);

  return (
    <Button
      onClick={exportSelectedCards}
      design="plain"
      className={s.export}
      active={active}
    >
      Export
    </Button>
  );
};

export default memo(ExportCards);
