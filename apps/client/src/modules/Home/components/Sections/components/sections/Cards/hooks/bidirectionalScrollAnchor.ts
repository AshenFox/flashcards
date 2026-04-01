import type { GetMainCardsResponseDto } from "@flashcards/common";
import type { InfiniteData } from "@tanstack/react-query";
import type { Virtualizer } from "@tanstack/react-virtual";
import type { MutableRefObject } from "react";

export function calculateCardsFirstItemOffset(
  data: InfiniteData<GetMainCardsResponseDto, number> | undefined,
  prevData: InfiniteData<GetMainCardsResponseDto, number> | undefined,
): number {
  if (!data || !prevData) {
    return 0;
  }

  if (prevData.pageParams[0] === data.pageParams[0]) {
    return 0;
  }

  if (prevData.pageParams[0] === data.pageParams[1]) {
    return data.pages[0].entries.length;
  }

  if (prevData.pageParams[1] === data.pageParams[0]) {
    return -prevData.pages[0].entries.length;
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

  scrollVirtualizerWindowToOffset(virtualizer, scrollOffset, undefined, adjustments);

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
