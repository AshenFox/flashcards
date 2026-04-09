import { useActions } from "@store/hooks";
import { type RefObject, useCallback, useEffect, useRef } from "react";

const docY = (el: Element) => {
  const r = el.getBoundingClientRect();
  return r.top + window.scrollY;
};

/** Scroll distance (px) over which margin eases from 0 to max; scales with chrome height. */
const MIN_SCROLL_BLEND_PX = 96;
const SCROLL_BLEND_RATIO = 1.25;

type UseGlobalHeaderPullForHomeCardsArgs = {
  listTopRef: RefObject<HTMLElement | null>;
  hasPreviousPage: boolean;
  hasData: boolean;
};

export const useGlobalHeaderPullForHomeCards = ({
  listTopRef,
  hasPreviousPage,
  hasData,
}: UseGlobalHeaderPullForHomeCardsArgs) => {
  const { setAppVerticalOffset } = useActions();

  const rafRef = useRef<number | null>(null);
  const lastDispatchedRef = useRef<number>(0);

  const flags = { hasPreviousPage, hasData };
  const flagsRef = useRef(flags);
  flagsRef.current = flags;

  const commit = useCallback(
    (px: number) => {
      const rounded = Math.round(px * 100) / 100;
      if (rounded === lastDispatchedRef.current) return;
      lastDispatchedRef.current = rounded;
      setAppVerticalOffset({ value: rounded });
    },
    [setAppVerticalOffset],
  );

  const compute = useCallback(() => {
    const flags = flagsRef.current;
    const appHeader = document.querySelector("header");
    const listEl = listTopRef.current;

    if (!flags.hasData || !appHeader || !listEl) {
      commit(0);
      return;
    }

    const maxPull = Math.max(0, docY(listEl) - docY(appHeader));
    if (maxPull === 0) {
      commit(0);
      return;
    }

    let marginMagnitude: number;
    if (flags.hasPreviousPage) {
      marginMagnitude = maxPull;
    } else {
      const blendRange =
        Math.max(MIN_SCROLL_BLEND_PX, maxPull * SCROLL_BLEND_RATIO) || 1;
      const progress = Math.min(1, window.scrollY / blendRange);
      marginMagnitude = maxPull * progress;
    }

    commit(marginMagnitude);
  }, [commit, listTopRef]);

  const scheduleCompute = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      compute();
    });
  }, [compute]);

  useEffect(() => {
    scheduleCompute();
  }, [hasData, hasPreviousPage, scheduleCompute]);

  useEffect(() => {
    const onScrollOrResize = () => scheduleCompute();

    scheduleCompute();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    const ro = new ResizeObserver(onScrollOrResize);
    const listEl = listTopRef.current;
    if (listEl) ro.observe(listEl);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      ro.disconnect();
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastDispatchedRef.current = 0;
      setAppVerticalOffset({ value: 0 });
    };
  }, [listTopRef, scheduleCompute, setAppVerticalOffset]);
};
