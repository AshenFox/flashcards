import type { ModalEntry } from "@modules/Modal/store";
import { useModalStore } from "@modules/Modal/store";
import { CloseIcon } from "@ui/Icons";
import { memo, MouseEvent, useEffect, useRef } from "react";

import contentStyles from "./components/Content/styles.module.scss";
import s from "./styles.module.scss";
import { transitionBackdrop, transitionDialog } from "./transitions";

type ModalShellProps = {
  entry: ModalEntry;
  stackIndex: number;
};

const ModalShell = ({ entry, stackIndex }: ModalShellProps) => {
  const close = useModalStore(state => state.close);
  const _remove = useModalStore(state => state._remove);

  const layerEl = useRef<HTMLDivElement>(null);
  const dialogEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerEl.current;
    const dialog = dialogEl.current;
    if (!layer || !dialog || entry.isClosing) return;

    const styleLayer = layer.style;
    const styleDialog = dialog.style;

    styleLayer.display = "flex";

    const openDialogTimeout = setTimeout(() => {
      styleDialog.opacity = "1";
      styleDialog.transform = "translateY(0vh)";
    }, transitionBackdrop);

    return () => {
      clearTimeout(openDialogTimeout);
    };
  }, [entry.isClosing]);

  useEffect(() => {
    const layer = layerEl.current;
    const dialog = dialogEl.current;
    if (!layer || !dialog || !entry.isClosing) return;

    const styleLayer = layer.style;
    const styleDialog = dialog.style;

    styleDialog.opacity = "";
    styleDialog.transform = "";

    const removeTimeout = setTimeout(() => {
      styleLayer.display = "";
      _remove(entry.id);
    }, transitionDialog);

    return () => {
      clearTimeout(removeTimeout);
    };
  }, [entry.isClosing, entry.id, _remove]);

  const closeClick = (_e: MouseEvent<HTMLDivElement>) => close(entry.id);

  return (
    <div
      className={s.dialogLayer}
      ref={layerEl}
      style={{ zIndex: 1001 + stackIndex }}
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
