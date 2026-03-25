import { CardsUIProvider } from "@components/Cards";
import { memo, useEffect, useMemo } from "react";

import Body from "./components/Body/Body";
import Header from "./components/Header/Header";
import {
  useModuleCardsCache,
  useModuleCardsUIStore,
  useModuleFiltersStore,
  useModuleQuery,
  useSyncModulePagination,
} from "./hooks";

const Module = () => {
  const { data } = useModuleQuery();
  useSyncModulePagination(data);

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
