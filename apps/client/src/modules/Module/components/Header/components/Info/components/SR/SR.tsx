import { useSetCardSRMutation } from "@components/Cards";
import type { CardDto } from "@flashcards/common";
import { StudyRegimeIcon } from "@ui/Icons";
import Switch from "@ui/Switch";
import Tooltip from "@ui/Tooltip";
import clsx from "clsx";
import { memo, MouseEvent, useLayoutEffect, useMemo, useState } from "react";

import s from "./styles.module.scss";

type SRProps = {
  cards: CardDto[];
  loading: boolean;
};

const SR = ({ cards, loading }: SRProps) => {
  const setCardsSRMut = useSetCardSRMutation();
  const [active, setActive] = useState(false);
  const [prevActive, setPrevActive] = useState(false);

  useLayoutEffect(() => {
    setPrevActive(active);
    setActive(cards.length ? cards.every(card => card.studyRegime) : false);
  }, [cards, active]);

  const clickSwitch = (_e: MouseEvent<HTMLLabelElement>) => {
    const _id_arr = cards.map(c => c._id);
    setCardsSRMut.mutate({ _id_arr, value: !active });
  };

  const switchIcon = useMemo(() => {
    return (
      <div className={s.sr_control_icon}>
        <StudyRegimeIcon />
        <Tooltip id={`module-sr-control`}>All cards study regime</Tooltip>
      </div>
    );
  }, []);

  return (
    <Switch
      id={`module-sr-control`}
      className={clsx(s.sr_control)}
      active={loading ? prevActive : active}
      icon={switchIcon}
      onClick={clickSwitch}
    />
  );
};

export default memo(SR);
