import { createContext, ReactNode, useContext, useState } from "react";

interface EditContextType {
  selectionActive: boolean;
  setSelectionActive: (value: boolean) => void;
}

const EditContext = createContext<EditContextType | undefined>(undefined);

interface EditContextProviderProps {
  children: ReactNode;
}

export const EditContextProvider = ({ children }: EditContextProviderProps) => {
  const [selectionActive, setSelectionActive] = useState(false);

  return (
    <EditContext.Provider value={{ selectionActive, setSelectionActive }}>
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
