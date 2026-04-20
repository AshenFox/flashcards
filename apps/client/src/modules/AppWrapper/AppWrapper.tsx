import { CSSProperties, memo, useEffect, useMemo, useState } from "react";

import { useHasActiveOwner } from "./hooks/registry";
import { useGlobalHeaderPull } from "./hooks/useGlobalHeaderPull";
import s from "./styles.module.scss";

type AppWrapperProps = {
  children: React.ReactNode;
};

const AppWrapper = ({ children }: AppWrapperProps) => {
  const [offset, setOffset] = useState(0);
  const [transitionArmed, setTransitionArmed] = useState(false);

  useGlobalHeaderPull(setOffset);

  const hasActiveOwner = useHasActiveOwner();

  useEffect(() => {
    if (hasActiveOwner) {
      setTimeout(() => setTransitionArmed(true), 400);
    } else {
      setTransitionArmed(false);
    }
  }, [hasActiveOwner]);

  useEffect(() => {
    return () => {
      setTransitionArmed(false);
    };
  }, []);

  const style = useMemo<CSSProperties | undefined>(() => {
    if (!hasActiveOwner) return undefined;

    return {
      transform: `translateY(${-offset}px)`,
      marginBottom: `-${offset}px`,
      willChange: "margin-bottom, transform",
      transition: transitionArmed ? "transform 0.1s linear" : undefined,
    };
  }, [hasActiveOwner, offset, transitionArmed]);

  return (
    <div className={s.appWrapper} style={style}>
      {children}
    </div>
  );
};

export default memo(AppWrapper);
