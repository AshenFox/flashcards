import type { CardDto, GetMainCardsResponseDto } from "@flashcards/common";
import type { InfiniteData } from "@tanstack/react-query";
import type { VirtualItem, Virtualizer } from "@tanstack/react-virtual";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { createDebouncedRowHeightsMerge } from "@zustand/rowHeights";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";

import { rowShowsDateDivider } from "../../components/Divider/Divider";
import {
  applyScrollAnchorLibraryHandoff,
  calculateCardsFirstItemOffset,
  restoreScrollOffsetAfterFirstItemChange,
} from "./bidirectionalScrollAnchor";
import { getQueryKey } from "./query";
import {
  useHomeCardsFiltersStore,
  useHomeCardsRowHeightsStore,
  useHomeCardsUIStore,
} from "./stores";

const CARD_ROW_BASE_ESTIMATE = 240;
const DIVIDER_EXTRA_ESTIMATE = 72;
const EDIT_MODE_EXTRA_ESTIMATE = 100;

const DEBOUNCED_DELAY_MS = 120;

const EMPTY_HEIGHTS: Record<string, number> = {};

type UseCardsVirtualizerArgs = {
  rawCards: CardDto[];
  /** When set, enables scroll anchoring for bidirectional infinite pages. */
  infiniteData?: InfiniteData<GetMainCardsResponseDto, number>;
};

export const useCardsRowHeightsNamespaceKey = () => {
  const filters = useHomeCardsFiltersStore(state => state.filters);
  return useMemo(() => JSON.stringify(getQueryKey(filters)), [filters]);
};

export const useCardsVirtualizer = ({
  rawCards,
  infiniteData,
}: UseCardsVirtualizerArgs): {
  virtualizer: Virtualizer<Window, Element>;
  namespaceKey: string;
} => {
  const namespaceKey = useCardsRowHeightsNamespaceKey();

  const { schedule, flush } = useMemo(
    () => createDebouncedRowHeightsMerge(useHomeCardsRowHeightsStore, DEBOUNCED_DELAY_MS),
    [],
  );

  const lastScheduledHeightsRef = useRef<Record<string, number>>({});
  const prevNamespaceKeyRef = useRef<string | undefined>(undefined);
  const prevInfiniteDataRef = useRef<
    InfiniteData<GetMainCardsResponseDto, number> | undefined
  >(undefined);
  const restoredScrollOffsetRef = useRef(false);
  const virtualizerRef = useRef<Virtualizer<Window, Element> | null>(null);

  if (prevNamespaceKeyRef.current !== namespaceKey) {
    prevNamespaceKeyRef.current = namespaceKey;
    const heights =
      useHomeCardsRowHeightsStore.getState().namespaces[namespaceKey]?.heights;
    lastScheduledHeightsRef.current = heights ? { ...heights } : {};
  }

  useLayoutEffect(() => {
    restoredScrollOffsetRef.current = false;
    prevInfiniteDataRef.current = infiniteData;
  });

  const firstItemOffset =
    !infiniteData
      ? 0
      : calculateCardsFirstItemOffset(infiniteData, prevInfiniteDataRef.current);

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

  useMemo(() => {
    if (firstItemOffset < 0 && virtualizerRef.current) {
      restoreScrollOffsetAfterFirstItemChange(
        virtualizerRef.current,
        firstItemOffset,
        restoredScrollOffsetRef,
      );
    }
  }, [firstItemOffset]);

  const estimateRowSize = useCallback(
    (index: number) => {
      const card = rawCards[index];
      if (!card) return CARD_ROW_BASE_ESTIMATE;
      const prevDate = rawCards[index - 1]?.creation_date;
      let size = CARD_ROW_BASE_ESTIMATE;
      if (rowShowsDateDivider(prevDate, card.creation_date)) {
        size += DIVIDER_EXTRA_ESTIMATE;
      }
      if (useHomeCardsUIStore.getState().get(card._id).edit) {
        size += EDIT_MODE_EXTRA_ESTIMATE;
      }
      return size;
    },
    [rawCards],
  );

  const initialMeasurementsCache = useMemo((): VirtualItem[] => {
    const persistedHeights =
      useHomeCardsRowHeightsStore.getState().namespaces[namespaceKey]?.heights ??
      EMPTY_HEIGHTS;
    return rawCards.map((card, index) => ({
      index,
      key: card._id,
      size: persistedHeights[card._id] ?? estimateRowSize(index),
      start: 0,
      end: 0,
      lane: 0,
    }));
  }, [rawCards, namespaceKey, estimateRowSize]);

  const virtualizer = useWindowVirtualizer({
    count: rawCards.length,
    overscan: 7,
    gap: 15,
    estimateSize: estimateRowSize,
    getItemKey: index => rawCards[index]?._id ?? index,
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

  virtualizerRef.current = virtualizer;

  useMemo(() => {
    if (firstItemOffset > 0) {
      restoreScrollOffsetAfterFirstItemChange(
        virtualizer,
        firstItemOffset,
        restoredScrollOffsetRef,
      );
    }
  }, [firstItemOffset, virtualizer]);

  applyScrollAnchorLibraryHandoff(virtualizer, firstItemOffset);

  return { virtualizer, namespaceKey };
};
