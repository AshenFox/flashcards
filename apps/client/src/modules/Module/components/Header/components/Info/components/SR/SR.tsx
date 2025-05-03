import { useActions, useAppSelector } from "@store/hooks";
import { StudyRegimeIcon } from "@ui/Icons";
import Switch from "@ui/Switch";
import Tooltip from "@ui/Tooltip";
import clsx from "clsx";
import { memo, MouseEvent } from "react";

import s from "./styles.module.scss";

const SR = () => {
  const { setCardsSR } = useActions();

  const cards = useAppSelector(s => s.main.cards);

  const cardsArr = Object.values(cards);

  let active = !!cardsArr.length;

  for (const card of cardsArr) {
    if (card.studyRegime === false) {
      active = false;
      break;
    }
  }

  const clickSwitch = (e: MouseEvent<HTMLLabelElement>) => setCardsSR(!active);

  return (
    <Switch
      id={`module-sr-control`}
      className={clsx(s.sr_control)}
      active={active}
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
