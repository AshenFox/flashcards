import { useEffect, useState } from "react";

/** True when the primary input can hover (e.g. mouse). False for touch-only. */
export const useCanHover = (): boolean => {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    setCanHover(mq.matches);
    const listener = () => setCanHover(mq.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  return canHover;
};
