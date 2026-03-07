import { useMoveGallery } from "@zustand/cards";
import { TriangleLeftIcon, TriangleRightIcon } from "@ui/Icons";
import { clsx } from "clsx";
import { memo, MouseEvent, useCallback } from "react";

import s from "../styles.module.scss";

type ControlProps = {
  direction: "left" | "right";
  _id: string;
  galleryPosition?: number;
  galleryWidth?: number;
};

const Control = ({ direction, _id, galleryPosition = 0, galleryWidth = 0 }: ControlProps) => {
  const moveGallery = useMoveGallery();

  const position = galleryPosition;
  const width = galleryWidth;

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
