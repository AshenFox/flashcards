import { useActions } from "@store/hooks";
import { createContext, ReactNode, useContext } from "react";

import type { CardActions, CardUIStore } from "./types";
import { CardsFilters, FilterStore } from "@zustand/filters";

const CardActionsContext = createContext<CardActions | null>(null);

export const useCardActions = (): CardActions => {
  const context = useContext(CardActionsContext);
  const reduxActions = useActions();

  if (context) return context;

  return reduxActions as unknown as CardActions;
};

export const CardActionsProvider = ({
  value,
  children,
}: {
  value: CardActions;
  children: ReactNode;
}) => (
  <CardActionsContext.Provider value={value}>
    {children}
  </CardActionsContext.Provider>
);

/* export type CardsUIContext = {
  useCardsFiltersStore: () => FilterStore<CardsFilters>;
  useCardsUIStore: () => CardUIStore;
};

export const CardsUIContext = createContext<CardsUIContext | null>(null);

export const useCardsUIStore = () => {
  const context = useContext(CardsUIContext);
  if (!context)
    throw new Error("useCardsUIContext must be used within a CardsUIContext");
  return context.useCardsUIStore;
};
 */
