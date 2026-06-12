import { useCardsCash } from "@components/Cards";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { useEditCardsUIStore } from "./hooks";

interface EditContextType {
  selectionActive: boolean;
  toggleSelectionActive: () => void;
}

const EditContext = createContext<EditContextType | undefined>(undefined);

interface EditContextProviderProps {
  children: ReactNode;
}

export const EditContextProvider = ({ children }: EditContextProviderProps) => {
  const [selectionActive, setSelectionActive] = useState(false);
  const cardsCache = useCardsCash();
  const setCardUI = useEditCardsUIStore(s => s.set);

  const toggleSelectionActive = useCallback(() => {
    setSelectionActive(prev => !prev);
    for (const card of cardsCache.getAllCards()) {
      setCardUI(card._id, d => {
        d.save = false;
      });
    }
  }, [cardsCache, setCardUI]);

  const contextValue = useMemo(
    () => ({ selectionActive, toggleSelectionActive }),
    [selectionActive, toggleSelectionActive],
  );

  return (
    <EditContext.Provider value={contextValue}>{children}</EditContext.Provider>
  );
};

export const useEditContext = () => {
  const context = useContext(EditContext);
  if (context === undefined) {
    throw new Error("useEditContext must be used within an EditProvider");
  }
  return context;
};
