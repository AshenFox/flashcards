import { CardsUIProvider } from "@components/Cards";
import { memo, useEffect } from "react";

import Body from "./components/Body/Body";
import Header from "./components/Header/Header";
import {
  useModuleCardsCache,
  useModuleCardsQuery,
  useModuleCardsUIStore,
  useModuleFiltersStore,
  useSyncModulePagination,
} from "./hooks";

const Module = () => {
  const { data: cardsData } = useModuleCardsQuery();
  useSyncModulePagination(cardsData);

  const resetFilters = useModuleFiltersStore(s => s.resetFilters);
  const resetUI = useModuleCardsUIStore(s => s.reset);

  useEffect(() => {
    return () => {
      resetFilters();
      resetUI();
    };
  }, [resetFilters, resetUI]);

  return (
    <CardsUIProvider
      useCardsUIStore={useModuleCardsUIStore}
      useCardsCash={useModuleCardsCache}
    >
      <Header />
      <Body />
    </CardsUIProvider>
  );
};

export default memo(Module);
