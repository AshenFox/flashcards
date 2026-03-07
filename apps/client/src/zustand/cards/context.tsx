import { createContext, ReactNode, useContext, useMemo } from "react";

import type { CardUIStore } from "./types";
import { CardsFilters, FilterStore } from "@zustand/filters";
import { QueryKey } from "@tanstack/react-query";

// Hook type: no args => full state; with selector => selected state
type StoreHook<S> = {
  (): S;
  <T>(selector: (state: S) => T): T;
};

export type CardsUIContextValue = {
  useCardsFiltersStore: StoreHook<FilterStore<CardsFilters>>;
  useCardsUIStore: StoreHook<CardUIStore>;
};

export const CardsUIContext = createContext<CardsUIContextValue | null>(null);

export type CardsUIProviderProps = {
  useCardsFiltersStore: StoreHook<FilterStore<CardsFilters>>;
  useCardsUIStore: StoreHook<CardUIStore>;
  children: ReactNode;
};

export const CardsUIProvider = ({
  useCardsFiltersStore,
  useCardsUIStore,
  children,
}: CardsUIProviderProps) => (
  <CardsUIContext.Provider value={{ useCardsFiltersStore, useCardsUIStore }}>
    {children}
  </CardsUIContext.Provider>
);

export function useCardsFiltersStore(): FilterStore<CardsFilters>;
export function useCardsFiltersStore<T>(
  selector: (state: FilterStore<CardsFilters>) => T,
): T;
export function useCardsFiltersStore<T>(
  selector?: (state: FilterStore<CardsFilters>) => T,
) {
  const context = useContext(CardsUIContext);
  if (!context)
    throw new Error(
      "useCardsFiltersStore must be used within a CardsUIContext provider",
    );
  return context.useCardsFiltersStore(selector);
}

export function useCardsUIStore(): CardUIStore;
export function useCardsUIStore<T>(selector: (state: CardUIStore) => T): T;
export function useCardsUIStore<T>(selector?: (state: CardUIStore) => T) {
  const context = useContext(CardsUIContext);
  if (!context)
    throw new Error(
      "useCardsUIStore must be used within a CardsUIContext provider",
    );
  return context.useCardsUIStore(selector);
}

/** Gets the current cards query key from the filters store (queryKey(filters)). */
export function useCardsQueryKey(): QueryKey {
  const filters = useCardsFiltersStore(s => s.filters);
  const queryKey = useCardsFiltersStore(s => s.queryKey);
  return useMemo(() => queryKey(filters), [filters, queryKey]);
}

/** Returns the raw store hook (with getState) for use in action hooks. */
export function useCardsUIStoreApi(): StoreHook<CardUIStore> & {
  getState: () => CardUIStore;
} {
  const context = useContext(CardsUIContext);
  if (!context)
    throw new Error(
      "useCardsUIStoreApi must be used within a CardsUIContext provider",
    );
  return context.useCardsUIStore as StoreHook<CardUIStore> & {
    getState: () => CardUIStore;
  };
}
