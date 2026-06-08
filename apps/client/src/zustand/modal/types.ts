import type { ReactNode } from "react";

export type ModalEntry = {
  id: string;
  title: string;
  content: ReactNode;
  isClosing: boolean;
};

export type ModalConfig = Pick<ModalEntry, "title" | "content">;

export type ModalStore = {
  modals: ModalEntry[];
  open: (config: ModalConfig) => string;
  replace: (config: ModalConfig) => void;
  close: (id?: string) => void;
  closeAll: () => void;
  _remove: (id: string) => void;
};
