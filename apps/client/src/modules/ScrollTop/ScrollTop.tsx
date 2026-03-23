import { Virtualizer } from "@tanstack/react-virtual";
import { ArrowUpIcon } from "@ui/Icons";
import clsx from "clsx";
import { memo, useCallback, useEffect, useRef, useState } from "react";

import s from "./styles.module.scss";

type ScrollTopProps = {
  virtualizer?: Virtualizer<Window | Element, Element>;
};

const ScrollTop = ({ virtualizer }: ScrollTopProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const isVisibleRef = useRef(isVisible);
  isVisibleRef.current = isVisible;

  const scrollToTopSmooth = useCallback(() => {
    virtualizer?.scrollToOffset(0, { behavior: "smooth" });
  }, [virtualizer]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100 && !isVisibleRef.current) setIsVisible(true);

      if (window.scrollY < 100 && isVisibleRef.current) setIsVisible(false);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [setIsVisible]);

  const clickScroll = useCallback(() => {
    if (!isVisible) return;

    if (virtualizer) scrollToTopSmooth();
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }, [virtualizer, isVisible]);

  return (
    <div
      className={clsx(s.scroll, isVisible && s.active)}
      onClick={clickScroll}
    >
      <ArrowUpIcon height="20" width="20" />
    </div>
  );
};

export default memo(ScrollTop);
