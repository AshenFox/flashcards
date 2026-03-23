import { QueryKey } from "@tanstack/react-query";
import { CardsFilters, FilterStore } from "@zustand/filters";
import { createContext, ReactNode, useContext, useMemo } from "react";

import type { CardsUIStore } from "./types";

// Hook type: no args => full state; with selector => selected state
type StoreHook<S> = {
  (): S;
  <T>(selector: (state: S) => T): T;
};

export type CardsUIContextValue = {
  useCardsFiltersStore: StoreHook<FilterStore<CardsFilters>>;
  useCardsUIStore: StoreHook<CardsUIStore>;
};

export const CardsUIContext = createContext<CardsUIContextValue | null>(null);

export type CardsUIProviderProps = {
  useCardsFiltersStore: StoreHook<FilterStore<CardsFilters>>;
  useCardsUIStore: StoreHook<CardsUIStore>;
  children: ReactNode;
};

export const CardsUIProvider = ({
  useCardsFiltersStore,
  useCardsUIStore,
  children,
}: CardsUIProviderProps) => {
  const value = useMemo(
    () => ({ useCardsFiltersStore, useCardsUIStore }),
    [useCardsFiltersStore, useCardsUIStore],
  );

  return (
    <CardsUIContext.Provider value={value}>{children}</CardsUIContext.Provider>
  );
};

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

export function useCardsUIStore(): CardsUIStore;
export function useCardsUIStore<T>(selector: (state: CardsUIStore) => T): T;
export function useCardsUIStore<T>(selector?: (state: CardsUIStore) => T) {
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
