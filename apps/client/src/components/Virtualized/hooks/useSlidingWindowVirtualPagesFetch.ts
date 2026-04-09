import { UseInfiniteQueryResult } from "@tanstack/react-query";
import type { Virtualizer } from "@tanstack/react-virtual";
import { useEffect } from "react";

/**
 * Triggers infinite-query fetches when the window-scrolled virtual list exposes
 * rows near the end (next page) and optionally near the start (previous page).
 *
 * Pass the infinite-query result (or a typed subset of it) to avoid plumbing
 * multiple individual fields.
 */
export function useSlidingWindowVirtualPagesFetch({
  virtualizer,
  itemCount,
  query,
  firstVisibleThreshold,
}: {
  virtualizer: Virtualizer<Window, Element>;
  itemCount: number;
  query: UseInfiniteQueryResult;
  firstVisibleThreshold: number;
}): void {
  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = query;

  useEffect(() => {
    const maybeFetchNext = () => {
      if (!hasNextPage || isFetchingNextPage || isFetching) return;

      const items = virtualizer.getVirtualItems();
      const lastItem = items[items.length - 1];
      if (!lastItem) return;
      if (lastItem.index >= itemCount - 1) {
        fetchNextPage();
      }
    };

    const maybeFetchPrevious = () => {
      if (
        !hasPreviousPage ||
        isFetchingPreviousPage ||
        isFetching ||
        !fetchPreviousPage
      )
        return;

      const items = virtualizer.getVirtualItems();
      const firstItem = items[0];
      if (!firstItem) return;
      if (firstItem.index <= firstVisibleThreshold) {
        fetchPreviousPage();
      }
    };

    const onScroll = () => {
      maybeFetchNext();
      maybeFetchPrevious();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [
    virtualizer,
    itemCount,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    firstVisibleThreshold,
  ]);
}
