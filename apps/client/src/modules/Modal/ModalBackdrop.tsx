import { useModalStore } from "@zustand/modal";
import { memo, MouseEvent, useEffect, useRef, useState } from "react";

import s from "./styles.module.scss";
import { transitionBackdrop, transitionDialog } from "./transitions";

const ModalBackdrop = () => {
  const modals = useModalStore(state => state.modals);
  const close = useModalStore(state => state.close);

  const backdropEl = useRef<HTMLDivElement>(null);
  const [render, setRender] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  const hasOpenModals = modals.some(modal => !modal.isClosing);

  useEffect(() => {
    if (hasOpenModals) {
      setRender(true);
      setFadingOut(false);
    } else if (modals.length > 0 && modals.every(modal => modal.isClosing)) {
      setFadingOut(true);
    }
  }, [modals, hasOpenModals]);

  useEffect(() => {
    const backdrop = backdropEl.current;
    if (!backdrop || !render || fadingOut) return;

    const style = backdrop.style;

    style.display = "block";

    const fadeInTimeout = setTimeout(() => {
      style.opacity = "1";
    }, 0);

    return () => {
      clearTimeout(fadeInTimeout);
    };
  }, [render, fadingOut]);

  useEffect(() => {
    const backdrop = backdropEl.current;
    if (!backdrop || !fadingOut) return;

    const style = backdrop.style;

    const fadeOutTimeout = setTimeout(() => {
      style.opacity = "0";
    }, transitionDialog);

    const hideTimeout = setTimeout(() => {
      style.display = "";
      setRender(false);
      setFadingOut(false);
    }, transitionDialog + transitionBackdrop);

    return () => {
      clearTimeout(fadeOutTimeout);
      clearTimeout(hideTimeout);
    };
  }, [fadingOut]);

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropEl.current) close();
  };

  if (!render) return null;

  return (
    <div
      className={s.backdrop}
      onMouseDown={onMouseDown}
      ref={backdropEl}
      style={{ transitionDuration: `${transitionBackdrop * 0.001}s` }}
    />
  );
};

export default memo(ModalBackdrop);
