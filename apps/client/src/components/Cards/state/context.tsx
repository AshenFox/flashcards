import { createContext, ReactNode, useContext, useMemo } from "react";

import type {
  CardsCache,
  CardsCacheHook,
  CardsUIStore,
  CardsUIStoreHook,
} from "./types";

export type CardsUIContextValue = {
  useCardsUIStore: CardsUIStoreHook;
  useCardsCash: CardsCacheHook;
};

export const CardsUIContext = createContext<CardsUIContextValue | null>(null);

export type CardsUIProviderProps = {
  useCardsUIStore: CardsUIStoreHook;
  useCardsCash: CardsCacheHook;
  children: ReactNode;
};

export const CardsUIProvider = ({
  useCardsUIStore,
  useCardsCash,
  children,
}: CardsUIProviderProps) => {
  const value = useMemo(
    () => ({ useCardsUIStore, useCardsCash }),
    [useCardsUIStore, useCardsCash],
  );

  return (
    <CardsUIContext.Provider value={value}>{children}</CardsUIContext.Provider>
  );
};

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

export function useCardsCash(): CardsCache {
  const context = useContext(CardsUIContext);
  if (!context)
    throw new Error(
      "useCacheCash must be used within a CardsUIContext provider",
    );
  return context.useCardsCash();
}
