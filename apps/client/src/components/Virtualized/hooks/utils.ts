import type { InfiniteData } from "@tanstack/react-query";
import type { Virtualizer } from "@tanstack/react-virtual";
import type { MutableRefObject } from "react";

/**
 * How many logical items were prepended or appended relative to the previous
 * infinite-query snapshot. Used to keep window scroll stable when pages shift.
 *
 * @param getFirstPageItemCount — length of the first page slice (e.g. `p => p.entries.length`
 *   for main cards, or `p => p.modules.entries.length` for modules).
 */
export function calculateInfiniteFirstItemOffset<TPage, TPageParam>(
  data: InfiniteData<TPage, TPageParam> | undefined,
  prevData: InfiniteData<TPage, TPageParam> | undefined,
  getFirstPageItemCount: (page: TPage) => number,
): number {
  if (!data || !prevData) {
    return 0;
  }

  if (prevData.pageParams[0] === data.pageParams[0]) {
    return 0;
  }

  if (prevData.pageParams[0] === data.pageParams[1]) {
    return getFirstPageItemCount(data.pages[0]);
  }

  if (prevData.pageParams[1] === data.pageParams[0]) {
    return -getFirstPageItemCount(prevData.pages[0]);
  }

  return 0;
}

function scrollVirtualizerWindowToOffset(
  virtualizer: Virtualizer<Window, Element>,
  offset: number,
  behavior: ScrollBehavior | undefined,
  adjustments: number | undefined,
) {
  virtualizer.options.scrollToFn(
    offset,
    { behavior, adjustments },
    virtualizer,
  );
}

export function restoreScrollOffsetAfterFirstItemChange(
  virtualizer: Virtualizer<Window, Element>,
  firstItemOffset: number,
  restoredScrollOffsetRef: MutableRefObject<boolean>,
) {
  if (firstItemOffset === 0) return;
  if (restoredScrollOffsetRef.current) return;

  if (firstItemOffset > 0) {
    virtualizer.calculateRange();
  }

  const offsetItemCache =
    virtualizer.measurementsCache[Math.abs(firstItemOffset)];
  if (!offsetItemCache) return;

  const delta =
    offsetItemCache.start -
    virtualizer.options.paddingStart -
    virtualizer.options.scrollMargin;

  const scrollOffset = virtualizer.scrollOffset;
  const adjustments = firstItemOffset < 0 ? -delta : delta;

  scrollVirtualizerWindowToOffset(
    virtualizer,
    scrollOffset,
    undefined,
    adjustments,
  );

  virtualizer.scrollOffset = scrollOffset + adjustments;
  restoredScrollOffsetRef.current = true;
}

export function applyScrollAnchorLibraryHandoff(
  virtualizer: Virtualizer<Window, Element>,
  firstItemOffset: number,
) {
  if (firstItemOffset === 0) {
    virtualizer.shouldAdjustScrollPositionOnItemSizeChange = undefined;
  } else {
    virtualizer.shouldAdjustScrollPositionOnItemSizeChange = item => {
      if (firstItemOffset < 0) {
        return false;
      }
      return item.index < Math.abs(firstItemOffset);
    };
  }
}
