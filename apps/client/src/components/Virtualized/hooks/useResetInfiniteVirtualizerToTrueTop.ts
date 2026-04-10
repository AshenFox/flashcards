import type {
  InfiniteData,
  QueryClient,
  QueryKey,
} from "@tanstack/react-query";
import type { Virtualizer } from "@tanstack/react-virtual";
import { useCallback, useRef, useState } from "react";

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

  const resetToTrueTop = useCallback(() => {
    if (resetInFlightRef.current) return;

    const queryKey = getQueryKey();
    const queryData =
      queryClient.getQueryData<InfiniteData<TPage, number>>(queryKey);

    const needsRefetch =
      !!queryData?.pages?.length && queryData.pageParams[0] !== 0;

    if (needsRefetch) {
      resetInFlightRef.current = true;
      setIsResettingToTop(true);

      queryClient.setQueryData<InfiniteData<TPage, number>>(queryKey, {
        pageParams: queryData.pageParams.map((_, i) => i),
        pages: queryData.pages,
      });

      queryClient.refetchQueries({ queryKey }).finally(() => {
        resetInFlightRef.current = false;
        setIsResettingToTop(false);
      });
    }

    setTimeout(() => {
      virtualizer.scrollToOffset(0, { behavior: scrollBehavior });
    }, 0);
  }, [queryClient, getQueryKey, virtualizer, scrollBehavior]);

  return { resetToTrueTop, isResettingToTop };
}
