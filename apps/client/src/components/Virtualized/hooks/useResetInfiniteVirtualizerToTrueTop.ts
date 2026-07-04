import type {
  InfiniteData,
  QueryClient,
  QueryKey,
} from "@tanstack/react-query";
import type { Virtualizer } from "@tanstack/react-virtual";
import { useCallback, useEffect, useRef, useState } from "react";

const TOP_OFFSET_PX = 1;
const SCROLL_IDLE_DELAY_MS = 120;

type UseResetSlidingWindowVirtualizerToTrueTopArgs = {
  queryClient: QueryClient;
  /** Resolved at click time so the correct cache entry is updated (e.g. current filters). */
  getQueryKey: () => QueryKey;
  virtualizer: Virtualizer<Window, Element>;
  scrollBehavior?: ScrollBehavior;
};

/**
 * Smooth-scrolls an infinite-list virtualizer to offset 0. If the cached infinite
 * window does not start at page param `0`, rewrites `pageParams` to `[0..n)` (keeping
 * the same `pages`), then refetches so API page indices align again while scroll runs.
 */
export function useResetSlidingWindowVirtualizerToTrueTop<TPage>({
  queryClient,
  getQueryKey,
  virtualizer,
  scrollBehavior = "smooth",
}: UseResetSlidingWindowVirtualizerToTrueTopArgs): {
  resetToTrueTop: () => void;
  isResettingToTop: boolean;
} {
  const [isResettingToTop, setIsResettingToTop] = useState(false);
  const resetInFlightRef = useRef(false);
  const resetCompletionRef = useRef({
    isRefetchSettled: true,
    isScrollSettled: true,
  });
  const scrollIdleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const resetScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const removeScrollListenersRef = useRef<(() => void) | null>(null);

  const clearResetScrollTimeout = useCallback(() => {
    if (!resetScrollTimeoutRef.current) return;

    clearTimeout(resetScrollTimeoutRef.current);
    resetScrollTimeoutRef.current = null;
  }, []);

  const clearScrollIdleTimeout = useCallback(() => {
    if (!scrollIdleTimeoutRef.current) return;

    clearTimeout(scrollIdleTimeoutRef.current);
    scrollIdleTimeoutRef.current = null;
  }, []);

  const cleanupScrollListeners = useCallback(() => {
    clearResetScrollTimeout();
    clearScrollIdleTimeout();
    removeScrollListenersRef.current?.();
    removeScrollListenersRef.current = null;
  }, [clearResetScrollTimeout, clearScrollIdleTimeout]);

  const finishResetIfReady = useCallback(() => {
    const { isRefetchSettled, isScrollSettled } = resetCompletionRef.current;
    if (!isRefetchSettled || !isScrollSettled) return;

    cleanupScrollListeners();
    resetInFlightRef.current = false;
    setIsResettingToTop(false);
  }, [cleanupScrollListeners]);

  const markScrollSettled = useCallback(() => {
    resetCompletionRef.current.isScrollSettled = true;
    finishResetIfReady();
  }, [finishResetIfReady]);

  const startWatchingScrollCompletion = useCallback(() => {
    cleanupScrollListeners();

    resetCompletionRef.current.isScrollSettled =
      window.scrollY <= TOP_OFFSET_PX;

    if (resetCompletionRef.current.isScrollSettled) {
      finishResetIfReady();
      return;
    }

    const scheduleScrollIdleCheck = () => {
      clearScrollIdleTimeout();
      scrollIdleTimeoutRef.current = setTimeout(
        markScrollSettled,
        SCROLL_IDLE_DELAY_MS,
      );
    };

    const onScroll = () => {
      if (window.scrollY <= TOP_OFFSET_PX) {
        markScrollSettled();
        return;
      }

      resetCompletionRef.current.isScrollSettled = false;
      scheduleScrollIdleCheck();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", markScrollSettled);
    removeScrollListenersRef.current = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", markScrollSettled);
    };

    scheduleScrollIdleCheck();
  }, [
    cleanupScrollListeners,
    clearScrollIdleTimeout,
    finishResetIfReady,
    markScrollSettled,
  ]);

  const resetToTrueTop = useCallback(() => {
    if (resetInFlightRef.current) return;

    const queryKey = getQueryKey();
    const queryData =
      queryClient.getQueryData<InfiniteData<TPage, number>>(queryKey);

    const needsRefetch =
      !!queryData?.pages?.length && queryData.pageParams[0] !== 0;

    resetInFlightRef.current = true;
    resetCompletionRef.current = {
      isRefetchSettled: !needsRefetch,
      isScrollSettled: false,
    };
    setIsResettingToTop(true);

    if (needsRefetch) {
      queryClient.setQueryData<InfiniteData<TPage, number>>(queryKey, {
        pageParams: queryData.pageParams.map((_, i) => i),
        pages: queryData.pages,
      });

      queryClient.refetchQueries({ queryKey }).finally(() => {
        resetCompletionRef.current.isRefetchSettled = true;
        finishResetIfReady();
      });
    }

    resetScrollTimeoutRef.current = setTimeout(() => {
      resetScrollTimeoutRef.current = null;
      startWatchingScrollCompletion();
      virtualizer.scrollToOffset(0, { behavior: scrollBehavior });
    }, 0);
  }, [
    queryClient,
    getQueryKey,
    virtualizer,
    scrollBehavior,
    finishResetIfReady,
    startWatchingScrollCompletion,
  ]);

  useEffect(() => {
    return () => cleanupScrollListeners();
  }, [cleanupScrollListeners]);

  return { resetToTrueTop, isResettingToTop };
}
