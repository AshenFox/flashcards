import { useCallback, useLayoutEffect, useRef } from "react";

import { type PullOptions, useActiveOwnerOptions } from "./registry";

/** Skip DOM writes when the rounded change is smaller than this. */
const MIN_DELTA_PX = 1;

const docY = (el: Element) => {
  const r = el.getBoundingClientRect();
  return r.top + window.scrollY;
};

export const useGlobalHeaderPull = (onOffset: (px: number) => void) => {
  const options = useActiveOwnerOptions();

  const rafRef = useRef<number | null>(null);
  const lastCommittedRef = useRef<number>(0);

  const optionsRef = useRef<PullOptions | null>(options);
  useLayoutEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const onOffsetRef = useRef(onOffset);
  useLayoutEffect(() => {
    onOffsetRef.current = onOffset;
  }, [onOffset]);

  const commit = useCallback((px: number) => {
    const rounded = Math.round(px);
    if (Math.abs(rounded - lastCommittedRef.current) < MIN_DELTA_PX) return;
    lastCommittedRef.current = rounded;
    onOffsetRef.current(rounded);
  }, []);

  const compute = useCallback(() => {
    const opts = optionsRef.current;
    const appHeader = document.querySelector("#app-header");
    const topEl = opts?.elementRef.current ?? null;

    if (!opts || !opts.enabled || !appHeader || !topEl) {
      commit(0);
      return;
    }

    const maxPull = Math.max(0, docY(topEl) - docY(appHeader));
    if (maxPull === 0) {
      commit(0);
      return;
    }

    let marginMagnitude: number;
    if (opts.tippingPoint) {
      marginMagnitude = maxPull;
    } else {
      const denom = Math.max(1, opts.blendDistancePx);
      const progress = Math.min(1, window.scrollY / denom);
      marginMagnitude = maxPull * progress;
    }

    commit(marginMagnitude);
  }, [commit]);

  const schedule = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      compute();
    });
  }, [compute]);

  useLayoutEffect(() => {
    const onScrollOrResize = () => schedule();

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [schedule]);

  useLayoutEffect(() => {
    schedule();
  }, [options, schedule]);

  useLayoutEffect(() => {
    const el = options?.elementRef.current ?? null;
    if (!el) return;
    const ro = new ResizeObserver(() => schedule());
    ro.observe(el);
    return () => ro.disconnect();
  }, [options, schedule]);
};
