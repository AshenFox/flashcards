import { useModalStore } from "@zustand/modal";
import { memo, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import ModalShell from "./ModalShell";

const ModalRenderer = () => {
  const modals = useModalStore(state => state.modals);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const portalTarget = document.getElementById("modal-root");
  if (!portalTarget) return null;

  return createPortal(
    <>
      {modals.map((entry, index) => (
        <ModalShell key={entry.id} entry={entry} stackIndex={index} />
      ))}
    </>,
    portalTarget,
  );
};

export default memo(ModalRenderer);
