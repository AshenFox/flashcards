import type { InfiniteData } from "@tanstack/react-query";
import type { VirtualItem, Virtualizer } from "@tanstack/react-virtual";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { createStoreHook } from "@zustand/helpers";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";

import { createDebouncedRowHeightsMerge, rowHeightsSlice } from "../store";
import {
  applyScrollAnchorLibraryHandoff,
  calculateInfiniteFirstItemOffset,
  restoreScrollOffsetAfterFirstItemChange,
} from "./utils";

const DEBOUNCED_DELAY_MS = 120;

type BaseItemDto = {
  _id: string;
};

type BaseResponseDto = {
  entries: BaseItemDto[];
};

type CreateHookArgs<ItemDto extends BaseItemDto> = {
  store: {
    storeName: string;
    instanceKey: string;
  };
  estimateItemSize: (card: ItemDto, index: number, cards: ItemDto[]) => number;
  baseEstimate: number;
};

type UseSlidingWindowVirtualizerArgs<
  ItemDto extends BaseItemDto,
  ResponseDto extends BaseResponseDto,
> = {
  rawItems: ItemDto[];
  infiniteData: InfiniteData<ResponseDto, number> | undefined;
  namespaceKey: string;
};

export const createSlidingWindowVirtualizerHook = <
  ItemDto extends BaseItemDto,
  ResponseDto extends BaseResponseDto,
>({
  store,
  estimateItemSize,
  baseEstimate: BASE_ESTIMATE,
}: CreateHookArgs<ItemDto>) => {
  const EMPTY_HEIGHTS: Record<string, number> = {};

  const usePersistedHeightsStore = createStoreHook({
    storeName: store.storeName,
    instanceKey: store.instanceKey,
    slice: rowHeightsSlice,
  });

  const getPageLength = (page: ResponseDto) => page.entries.length;

  const useSlidingWindowVirtualizer = ({
    rawItems,
    infiniteData,
    namespaceKey,
  }: UseSlidingWindowVirtualizerArgs<ItemDto, ResponseDto>): Virtualizer<
    Window,
    Element
  > => {
    const { schedule, flush } = useMemo(
      () =>
        createDebouncedRowHeightsMerge(
          usePersistedHeightsStore,
          DEBOUNCED_DELAY_MS,
        ),
      [],
    );

    const prevInfiniteDataRef = useRef<
      InfiniteData<ResponseDto, number> | undefined
    >(undefined);

    const virtualizerSnapshotForPrependRef = useRef<Virtualizer<
      Window,
      Element
    > | null>(null);

    const lastScheduledHeightsRef = useRef<Record<string, number>>({});
    const prevNamespaceKeyRef = useRef<string | undefined>(undefined);

    if (prevNamespaceKeyRef.current !== namespaceKey) {
      prevNamespaceKeyRef.current = namespaceKey;
      const heights =
        usePersistedHeightsStore.getState().namespaces[namespaceKey];
      lastScheduledHeightsRef.current = heights ? { ...heights } : {};
    }

    const restoredScrollOffsetRef = useRef(false);

    useLayoutEffect(() => {
      restoredScrollOffsetRef.current = false;
      prevInfiniteDataRef.current = infiniteData;
    });

    const firstItemOffset = !infiniteData
      ? 0
      : calculateInfiniteFirstItemOffset(
          infiniteData,
          prevInfiniteDataRef.current,
          getPageLength,
        );

    useEffect(() => {
      const html = document.documentElement;
      const previous = html.style.overflowAnchor;
      html.style.overflowAnchor = "none";

      return () => {
        html.style.overflowAnchor = previous;
      };
    }, []);

    useEffect(() => {
      return () => flush();
    }, [flush]);

    useLayoutEffect(() => {
      if (firstItemOffset < 0 && virtualizerSnapshotForPrependRef.current) {
        restoreScrollOffsetAfterFirstItemChange(
          virtualizerSnapshotForPrependRef.current,
          firstItemOffset,
          restoredScrollOffsetRef,
        );
      }
    }, [firstItemOffset]);

    const getPersistedHeights = useCallback(() => {
      const persistedHeights =
        usePersistedHeightsStore.getState().namespaces[namespaceKey] ??
        EMPTY_HEIGHTS;
      return persistedHeights;
    }, [namespaceKey]);

    const estimateSize = useCallback(
      (index: number) => {
        const item = rawItems[index];
        if (!item) return BASE_ESTIMATE;

        const persistedHeight = getPersistedHeights();
        const persistedHeightForItem = persistedHeight[item._id];
        if (persistedHeightForItem) return persistedHeightForItem;

        return estimateItemSize(item, index, rawItems);
      },
      [rawItems, getPersistedHeights],
    );

    const initialMeasurementsCache = useMemo((): VirtualItem[] => {
      const persistedHeights = getPersistedHeights();

      return rawItems.map((item, index) => ({
        index,
        key: item._id,
        size: persistedHeights[item._id] ?? estimateSize(index),
        start: 0,
        end: 0,
        lane: 0,
      }));
    }, [rawItems, getPersistedHeights, estimateSize]);

    const virtualizer = useWindowVirtualizer({
      count: rawItems.length,
      overscan: 5,
      gap: 15,
      estimateSize: estimateSize,
      getItemKey: index => rawItems[index]?._id ?? index,
      initialMeasurementsCache,
      onChange: instance => {
        const updates: Record<string, number> = {};
        const last = lastScheduledHeightsRef.current;

        for (const item of instance.measurementsCache) {
          if (item.size <= 0) continue;
          const id = String(item.key);
          const rounded = Math.round(item.size);
          if (last[id] === rounded) continue;
          updates[id] = rounded;
          last[id] = rounded;
        }

        if (Object.keys(updates).length === 0) return;
        schedule(namespaceKey, updates);
      },
    });

    useLayoutEffect(() => {
      if (firstItemOffset > 0) {
        restoreScrollOffsetAfterFirstItemChange(
          virtualizer,
          firstItemOffset,
          restoredScrollOffsetRef,
        );
      }
      virtualizerSnapshotForPrependRef.current = virtualizer;
    }, [firstItemOffset, virtualizer]);

    useLayoutEffect(() => {
      applyScrollAnchorLibraryHandoff(virtualizer, firstItemOffset);
    }, [virtualizer, firstItemOffset]);

    return virtualizer;
  };

  return useSlidingWindowVirtualizer;
};
