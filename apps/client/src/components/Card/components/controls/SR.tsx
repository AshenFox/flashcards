import { SRIndicator } from "@components/SRIndicator";
import SRInfoTooltip from "@components/SRIndicator/SRInfoTooltip";
import { useActions } from "@store/hooks";
import { Card } from "@store/reducers/main/types";
import Switch from "@ui/Switch";
import clsx from "clsx";
import { memo, MouseEvent, TouchEvent, useCallback, useRef } from "react";

import s from "./styles.module.scss";

type SRProps = {
  data: Card;
};

const SR = ({ data }: SRProps) => {
  const { setCardSR, setCardsSRPositive } = useActions();

  const { _id, studyRegime } = data;

  const up = useCallback(
    (e: MouseEvent<HTMLLabelElement> | TouchEvent<HTMLLabelElement>) => {
      e.preventDefault();
      clearTimeout(timer.current);

      if (timer.current) {
        setCardSR(_id, !studyRegime);
      }
    },
    [_id, setCardSR, studyRegime],
  );

  const down = useCallback(
    (e: MouseEvent<HTMLLabelElement> | TouchEvent<HTMLLabelElement>) => {
      timer.current = setTimeout(() => {
        timer.current = null;
        if (!studyRegime) setCardsSRPositive(_id);
      }, 550);
    },
    [_id, setCardsSRPositive, studyRegime],
  );

  const timer = useRef<ReturnType<typeof setTimeout>>(null);
  const id = `card_sr_${_id}`;

  return (
    <Switch
      id={id}
      className={clsx(s.controls_item, s.sr)}
      active={studyRegime}
      small
      icon={
        <>
          <SRIndicator stage={data.stage} active={studyRegime} small />
          <SRInfoTooltip id={id} data={data} />
        </>
      }
      onMouseDown={down}
      onMouseUp={up}
      onTouchStart={down}
      onTouchEnd={up}
    />
  );
};

export default memo(SR);
