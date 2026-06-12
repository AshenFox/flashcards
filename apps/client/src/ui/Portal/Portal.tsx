import { memo, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const usePortalTarget = () => {
  const [portalTarget, setPortalTarget] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = document?.querySelector<HTMLDivElement>("#__next");
    if (target) setPortalTarget(target);
  }, []);

  return portalTarget;
};

const Portal = ({ children }: { children: React.ReactNode }) => {
  const portalTarget = usePortalTarget();

  if (!portalTarget) return null;

  return createPortal(children, portalTarget);
};

export default memo(Portal);
