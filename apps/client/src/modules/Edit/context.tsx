import { useActions } from "@store/hooks";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

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
  const { setCardsSave } = useActions();

  const toggleSelectionActive = useCallback(() => {
    setSelectionActive(prev => !prev);
    setCardsSave({ value: false });
  }, [setCardsSave]);

  return (
    <EditContext.Provider value={{ selectionActive, toggleSelectionActive }}>
      {children}
    </EditContext.Provider>
  );
};

export const useEditContext = () => {
  const context = useContext(EditContext);
  if (context === undefined) {
    throw new Error("useEditContext must be used within an EditProvider");
  }
  return context;
};
