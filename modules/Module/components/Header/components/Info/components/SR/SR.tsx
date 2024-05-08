import { useActions, useAppSelector } from "@store/hooks";
import { StudyRegimeIcon } from "@ui/Icons";
import Switch from "@ui/Switch";
import clsx from "clsx";
import { memo, MouseEvent } from "react";

import s from "./styles.module.scss";

const SR = () => {
  const { set_cards_sr } = useActions();

  const { cards } = useAppSelector(({ main }) => main);

  const cardsArr = Object.values(cards);

  let active = !!cardsArr.length;

  for (const card of cardsArr) {
    if (card.studyRegime === false) {
      active = false;
      break;
    }
  }

  const clickSwitch = (e: MouseEvent<HTMLLabelElement>) =>
    set_cards_sr(!active);

  return (
    <Switch
      id={`module-sr-control`}
      className={clsx(s.sr_control)}
      active={active}
      icon={<StudyRegimeIcon />}
      onClick={clickSwitch}
      tooltip={"All cards study regime"}
    />
  );
};

export default memo(SR);
