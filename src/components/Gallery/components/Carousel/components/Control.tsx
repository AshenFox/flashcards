import { useActions, useAppSelector } from "@store/hooks";
import { TriangleLeftIcon, TriangleRightIcon } from "@ui/Icons";
import { clsx } from "clsx";
import { memo, MouseEvent, useCallback } from "react";

import s from "../styles.module.scss";

type ControlProps = {
  direction: "left" | "right";
  _id: string;
};

const Control = ({ direction, _id }: ControlProps) => {
  const { moveGallery } = useActions();

  const cards = useAppSelector(s => s.main.cards);

  const card = cards[_id];
  const { position = 0, width = 0 } = card?.gallery ?? {};

  let active = true;

  if (direction === "left") {
    if (Math.abs(position) <= 0) active = false;
  }

  if (direction === "right") {
    const innerWidth = window.innerWidth;
    let windowWidth = 0;

    if (innerWidth < 600) windowWidth = 17;
    if (innerWidth > 600) windowWidth = 34;
    if (innerWidth > 800) windowWidth = 51;
    if (innerWidth > 1000) windowWidth = 68;

    const sum = Math.abs(position) + windowWidth;

    if (sum >= width) active = false;
  }

  const clickControl = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (active) moveGallery({ _id, value: direction });
    },
    [_id, active, direction, moveGallery],
  );

  return (
    <div
      className={clsx(s.control, s[direction], { [s.disabled]: !active })}
      onClick={clickControl}
    >
      <button>
        {direction === "left" && <TriangleLeftIcon />}
        {direction === "right" && <TriangleRightIcon />}
      </button>
    </div>
  );
};

export default memo(Control);
