import { queryClient } from "@api/queryClient";
import { CardsUIProvider } from "@components/Cards";
import { memo, useEffect } from "react";

import Cards from "./components/Cards";
import Intro from "./components/Intro";
import Module from "./components/Module";
import { EditContextProvider } from "./context";
import {
  useEditCardsCache,
  useEditCardsQuery,
  useEditCardsUIStore,
  useEditQuery,
  useEditQueryErrorRedirect,
} from "./hooks";

const Edit = () => {
  useEditQuery();
  useEditCardsQuery();
  useEditQueryErrorRedirect();

  return (
    <CardsUIProvider
      useCardsUIStore={useEditCardsUIStore}
      useCardsCash={useEditCardsCache}
    >
      <EditContextProvider>
        <Intro />
        <Module />
        <Cards />
      </EditContextProvider>
    </CardsUIProvider>
  );
};

export default memo(Edit);
