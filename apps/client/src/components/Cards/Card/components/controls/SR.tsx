import { SRIndicator } from "@components/SRIndicator";
import SRInfoTooltip from "@components/SRIndicator/SRInfoTooltip";
import type { CardDto } from "@flashcards/common";
import Switch from "@ui/Switch";
import clsx from "clsx";
import {
  memo,
  MouseEvent,
  TouchEvent,
  useCallback,
  useMemo,
  useRef,
} from "react";

import { useSetCardSR, useSetCardsSRPositive } from "../../../state/actions";
import s from "./styles.module.scss";

type SRProps = {
  data: CardDto;
};

const SR = ({ data }: SRProps) => {
  const setCardSR = useSetCardSR();
  const setCardsSRPositive = useSetCardsSRPositive();

  const { _id, studyRegime } = data;

  const timer = useRef<ReturnType<typeof setTimeout>>(null);

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
    (_e: MouseEvent<HTMLLabelElement> | TouchEvent<HTMLLabelElement>) => {
      timer.current = setTimeout(() => {
        timer.current = null;
        if (!studyRegime) setCardsSRPositive(_id);
      }, 550);
    },
    [_id, setCardsSRPositive, studyRegime],
  );

  const id = `card_sr_${_id}`;

  const switchIcon = useMemo(() => {
    return (
      <div>
        <SRIndicator stage={data.stage} active={studyRegime} small />
        <SRInfoTooltip id={id} data={data} />
      </div>
    );
  }, [studyRegime, id, data]);

  return (
    <Switch
      id={id}
      className={clsx(s.controls_item, s.sr)}
      active={studyRegime}
      small
      icon={switchIcon}
      onMouseDown={down}
      onMouseUp={up}
      onTouchStart={down}
      onTouchEnd={up}
    />
  );
};

export default memo(SR);
