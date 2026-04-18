import type { Virtualizer } from "@tanstack/react-virtual";
import type { MutableRefObject } from "react";

/**
 * How many virtual items were prepended or removed at the front of the list
 * relative to the previous snapshot. Derived by matching stable `_id` keys
 * at the head of the two arrays. Used to keep window scroll stable when
 * pages (or any other front-edge items) shift.
 *
 * Semantics:
 *   > 0  — `n` items were prepended at the front.
 *   < 0  — `n` items were removed from the front (e.g. sliding window drop).
 *   = 0  — no detectable front shift (or unknown / unrelated diff).
 */
export function computeFirstItemOffsetByKeys(
  prev: ReadonlyArray<{ _id: string }> | undefined,
  cur: ReadonlyArray<{ _id: string }>,
  maxLookahead: number,
): number {
  if (!prev || prev.length === 0 || cur.length === 0) return 0;
  if (prev[0]._id === cur[0]._id) return 0;

  const prevFirstKey = prev[0]._id;
  const curScanLimit = Math.min(maxLookahead, cur.length);
  for (let i = 1; i < curScanLimit; i++) {
    if (cur[i]._id === prevFirstKey) return i;
  }

  const curFirstKey = cur[0]._id;
  const prevScanLimit = Math.min(maxLookahead, prev.length);
  for (let i = 1; i < prevScanLimit; i++) {
    if (prev[i]._id === curFirstKey) return -i;
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
