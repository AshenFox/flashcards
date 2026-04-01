import type { Virtualizer } from "@tanstack/react-virtual";
import { useEffect, useLayoutEffect } from "react";

const PREFIX = "home-cards-scroll:";

export const homeCardsScrollStorageKey = (namespaceKey: string) =>
  `${PREFIX}${namespaceKey}`;

const SAVE_DEBOUNCE_MS = 150;

type UseHomeCardsScrollRestoreArgs = {
  virtualizer: Virtualizer<Window, Element>;
  namespaceKey: string;
  rawCardsLength: number;
};

export function useHomeCardsScrollRestore({
  virtualizer,
  namespaceKey,
  rawCardsLength,
}: UseHomeCardsScrollRestoreArgs) {
  useLayoutEffect(() => {
    if (rawCardsLength === 0) return;

    const storageKey = homeCardsScrollStorageKey(namespaceKey);
    const raw = sessionStorage.getItem(storageKey);
    if (raw == null) return;

    const y = Number(raw);
    if (!Number.isFinite(y) || y < 0) return;

    sessionStorage.removeItem(storageKey);
    virtualizer.scrollToOffset(y, { behavior: "auto" });
  }, [virtualizer, namespaceKey, rawCardsLength]);

  useEffect(() => {
    const storageKey = homeCardsScrollStorageKey(namespaceKey);
    let debounceId: ReturnType<typeof setTimeout> | undefined;

    const persist = () => {
      sessionStorage.setItem(storageKey, String(window.scrollY));
    };

    const onScroll = () => {
      if (debounceId !== undefined) clearTimeout(debounceId);
      debounceId = setTimeout(persist, SAVE_DEBOUNCE_MS);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", persist);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", persist);
      if (debounceId !== undefined) clearTimeout(debounceId);
      persist();
    };
  }, [namespaceKey]);
}
