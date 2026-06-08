import { CloseIcon } from "@ui/Icons";
import type { ModalEntry } from "@zustand/modal";
import { useModalStore } from "@zustand/modal";
import { memo, MouseEvent, useEffect, useRef } from "react";

import contentStyles from "./components/Content/styles.module.scss";
import s from "./styles.module.scss";

type ModalShellProps = {
  entry: ModalEntry;
  stackIndex: number;
};

const transitionModal = 125;
const transitionDialog = 225;

const ModalShell = ({ entry, stackIndex }: ModalShellProps) => {
  const close = useModalStore(state => state.close);
  const _remove = useModalStore(state => state._remove);

  const modalEl = useRef<HTMLDivElement>(null);
  const dialogEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const modal = modalEl.current;
    const dialog = dialogEl.current;
    if (!modal || !dialog || entry.isClosing) return;

    const styleModal = modal.style;
    const styleDialog = dialog.style;

    styleModal.display = "flex";

    const openModalTimeout = setTimeout(() => {
      styleModal.opacity = "1";
    }, 0);

    const openDialogTimeout = setTimeout(() => {
      styleDialog.opacity = "1";
      styleDialog.transform = "translateY(0vh)";
    }, transitionModal);

    return () => {
      clearTimeout(openModalTimeout);
      clearTimeout(openDialogTimeout);
    };
  }, [entry.isClosing]);

  useEffect(() => {
    const modal = modalEl.current;
    const dialog = dialogEl.current;
    if (!modal || !dialog || !entry.isClosing) return;

    const styleModal = modal.style;
    const styleDialog = dialog.style;

    styleDialog.opacity = "";
    styleDialog.transform = "";

    const fadeTimeout = setTimeout(() => {
      styleModal.opacity = "0";
    }, transitionDialog);

    const removeTimeout = setTimeout(() => {
      styleModal.display = "";
      _remove(entry.id);
    }, transitionDialog + transitionModal);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(removeTimeout);
    };
  }, [entry.isClosing, entry.id, _remove]);

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === modalEl.current) close(entry.id);
  };

  const closeClick = (_e: MouseEvent<HTMLDivElement>) => close(entry.id);

  return (
    <div
      className={s.modal}
      onMouseDown={onMouseDown}
      style={{
        transitionDuration: `${transitionModal * 0.001}s`,
        zIndex: 1000 + stackIndex,
      }}
      ref={modalEl}
    >
      <div
        className={s.dialog}
        ref={dialogEl}
        style={{ transitionDuration: `${transitionDialog * 0.001}s` }}
      >
        <div className={s.header}>
          <div className={s.title}>
            <h3>{entry.title}</h3>
          </div>
          <div className={s.close} onClick={closeClick}>
            <CloseIcon />
          </div>
        </div>

        <div className={contentStyles.content}>{entry.content}</div>
      </div>
    </div>
  );
};

export default memo(ModalShell);
