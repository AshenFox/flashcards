import { useActions } from "@store/hooks";
import { type RefObject, useCallback, useLayoutEffect, useRef } from "react";

const docY = (el: Element) => {
  const r = el.getBoundingClientRect();
  return r.top + window.scrollY;
};

/** Skip DOM writes when the change is smaller than this. */
const MIN_DELTA_PX = 2;

type UseGlobalHeaderPullArgs = {
  topRef: RefObject<HTMLElement | null>;
  tippingPoint: boolean;
  enabled: boolean;
  blendDistancePx: number;
};

export const useGlobalHeaderPull = ({
  topRef,
  tippingPoint,
  enabled,
  blendDistancePx,
}: UseGlobalHeaderPullArgs) => {
  const { setAppVerticalOffset, setAppVerticalOffsetActive } = useActions();
  const rafRef = useRef<number | null>(null);
  const lastCommittedRef = useRef<number>(0);

  const flags = { tippingPoint, enabled };
  const flagsRef = useRef(flags);
  flagsRef.current = flags;

  const commit = useCallback(
    (px: number) => {
      const rounded = Math.round(px);
      if (Math.abs(rounded - lastCommittedRef.current) < MIN_DELTA_PX) return;
      lastCommittedRef.current = rounded;
      setAppVerticalOffset(rounded);
    },
    [setAppVerticalOffset],
  );

  const compute = useCallback(() => {
    const flags = flagsRef.current;
    const appHeader = document.querySelector("header");
    const topEl = topRef.current;

    if (!flags.enabled || !appHeader || !topEl) {
      commit(0);
      return;
    }

    const maxPull = Math.max(0, docY(topEl) - docY(appHeader));
    if (maxPull === 0) {
      commit(0);
      return;
    }

    let marginMagnitude: number;
    if (flags.tippingPoint) {
      marginMagnitude = maxPull;
    } else {
      const denom = Math.max(1, blendDistancePx);
      const progress = Math.min(1, window.scrollY / denom);
      marginMagnitude = maxPull * progress;
    }

    commit(marginMagnitude);
  }, [blendDistancePx, commit, topRef]);

  const scheduleCompute = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      compute();
    });
  }, [compute]);

  useLayoutEffect(() => {
    scheduleCompute();
  }, [enabled, tippingPoint, scheduleCompute]);

  useLayoutEffect(() => {
    setAppVerticalOffsetActive(true);

    const onScrollOrResize = () => scheduleCompute();

    scheduleCompute();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    const ro = new ResizeObserver(onScrollOrResize);
    const topEl = topRef.current;
    if (topEl) ro.observe(topEl);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      ro.disconnect();
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastCommittedRef.current = 0;
      setAppVerticalOffset(0);
      setAppVerticalOffsetActive(false);
    };
  }, [
    topRef,
    scheduleCompute,
    setAppVerticalOffset,
    setAppVerticalOffsetActive,
  ]);
};
