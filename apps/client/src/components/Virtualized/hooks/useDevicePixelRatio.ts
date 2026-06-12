import { useEffect, useState } from "react";

const getDevicePixelRatio = () =>
  typeof window === "undefined" ? 1 : window.devicePixelRatio || 1;

/**
 * Tracks `window.devicePixelRatio`, re-rendering whenever it changes (the user
 * moves the window to a monitor with different scaling, changes OS display
 * scaling, or zooms the page).
 *
 * Used to snap pixel offsets to the physical grid (`Math.round(px * dpr) / dpr`).
 * On fractional DPRs (Windows 125%/150% scaling) an integer CSS-pixel offset
 * maps to a half physical pixel, which can blur borders/text; snapping to
 * `1 / dpr` requires the live ratio.
 */
export function useDevicePixelRatio(): number {
  const [dpr, setDpr] = useState(getDevicePixelRatio);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let mediaQuery: MediaQueryList | null = null;

    const update = () => {
      const next = getDevicePixelRatio();
      setDpr(next);

      mediaQuery?.removeEventListener("change", update);
      mediaQuery = window.matchMedia(`(resolution: ${next}dppx)`);
      mediaQuery.addEventListener("change", update);
    };

    update();

    return () => {
      mediaQuery?.removeEventListener("change", update);
    };
  }, []);

  return dpr;
}
