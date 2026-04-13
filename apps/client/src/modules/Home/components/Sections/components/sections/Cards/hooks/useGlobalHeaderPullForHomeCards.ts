import { useActions } from "@store/hooks";
import {
  type RefObject,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";

import { HOME_CARDS_PAGE_SIZE } from "./query";

const docY = (el: Element) => {
  const r = el.getBoundingClientRect();
  return r.top + window.scrollY;
};

const CARD_HEIGHT_ESTIMATE = 240;
const BLEND_PAGES = 2.5;
const BLEND_DISTANCE_PX =
  HOME_CARDS_PAGE_SIZE * CARD_HEIGHT_ESTIMATE * BLEND_PAGES;

/** Skip DOM writes when the change is smaller than this. */
const MIN_DELTA_PX = 2;

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
  const lastCommittedRef = useRef<number>(0);

  const flags = { hasPreviousPage, hasData };
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
      const progress = Math.min(1, window.scrollY / BLEND_DISTANCE_PX);
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

  useLayoutEffect(() => {
    scheduleCompute();
  }, [hasData, hasPreviousPage, scheduleCompute]);

  useLayoutEffect(() => {
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
      lastCommittedRef.current = 0;
      setAppVerticalOffset(0);
    };
  }, [listTopRef, scheduleCompute, setAppVerticalOffset]);
};
