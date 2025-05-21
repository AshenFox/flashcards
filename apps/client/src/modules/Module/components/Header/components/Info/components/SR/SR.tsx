import { useActions, useAppSelector } from "@store/hooks";
import { StudyRegimeIcon } from "@ui/Icons";
import Switch from "@ui/Switch";
import Tooltip from "@ui/Tooltip";
import clsx from "clsx";
import { memo, MouseEvent, useLayoutEffect, useState } from "react";

import s from "./styles.module.scss";

const SR = () => {
  const { setCardsSR } = useActions();
  const [active, setActive] = useState(false);
  const [prevActive, setPrevActive] = useState(false);

  const cards = useAppSelector(s => s.main.cards);
  const loading = useAppSelector(s => s.main.sections?.moduleCards.loading);

  const cardsArr = Object.values(cards);

  useLayoutEffect(() => {
    setPrevActive(active);
    setActive(
      cardsArr.length ? cardsArr.every(card => card.studyRegime) : false,
    );
  }, [cardsArr, active]);

  const clickSwitch = (e: MouseEvent<HTMLLabelElement>) => setCardsSR(!active);

  return (
    <Switch
      id={`module-sr-control`}
      className={clsx(s.sr_control)}
      active={loading ? prevActive : active}
      icon={
        <>
          <StudyRegimeIcon />
          <Tooltip id={`module-sr-control`}>All cards study regime</Tooltip>
        </>
      }
      onClick={clickSwitch}
    />
  );
};

export default memo(SR);
