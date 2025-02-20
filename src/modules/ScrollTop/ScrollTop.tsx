import { useActions, useAppSelector } from "@store/hooks";
import { ArrowUpIcon } from "@ui/Icons";
import clsx from "clsx";
import { memo } from "react";
import { useEffect, useRef } from "react";

import s from "./styles.module.scss";

const ScrollTop = () => {
  const { setScrollTop } = useActions();

  const scroll_top = useAppSelector(s => s.main.scroll_top);

  const scroll_top_ref = useRef(scroll_top);
  scroll_top_ref.current = scroll_top;

  useEffect(() => {
    const onScroll = (e: Event) => {
      if (window.scrollY > 100 && !scroll_top_ref.current)
        setScrollTop({ value: true });

      if (window.scrollY < 100 && scroll_top_ref.current)
        setScrollTop({ value: false });
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const clickScroll = () => movePageUp();

  return (
    <div
      className={clsx(s.scroll, scroll_top && s.active)}
      onClick={clickScroll}
    >
      <ArrowUpIcon height="20" width="20" />
    </div>
  );
};

export default memo(ScrollTop);

let startTime: number = null;

const ease = (
  currentTime: number,
  startValue: number,
  changeInValue: number,
  duration: number,
) => {
  currentTime /= duration / 2;

  if (currentTime < 1)
    return (changeInValue / 2) * currentTime * currentTime + startValue;
  currentTime--;
  return (
    (-changeInValue / 2) * (currentTime * (currentTime - 2) - 1) + startValue
  );
};

const animation = (currentTime: number) => {
  if (startTime === null) startTime = currentTime;

  let timeElapsed = currentTime - startTime;
  let positionY = ease(timeElapsed, scrollY, -scrollY, 750);

  window.scrollTo(0, positionY);

  if (positionY) {
    requestAnimationFrame(animation);
  } else {
    startTime = null;
  }
};

const movePageUp = () => {
  let pageYOffset: number =
    window.pageYOffset || document.documentElement.scrollTop;

  if (pageYOffset) requestAnimationFrame(animation);
};
