import { CardsUIProvider } from "@components/Cards";
import { useGameStore } from "@zustand/game/gameStore";
import { memo, ReactNode, useCallback, useEffect, useRef } from "react";

import {
  useGameActiveCardsQuery,
  useGameCardsCache,
  useGameCardsUIStore,
  useGameRouteParams,
} from "./hooks";

type GameShellProps = {
  children: ReactNode;
  mode: "flashcards" | "write";
};

const GameShell = ({ children, mode }: GameShellProps) => {
  useGameBootstrap(mode);

  return (
    <CardsUIProvider
      useCardsUIStore={useGameCardsUIStore}
      useCardsCash={useGameCardsCache}
    >
      {children}
    </CardsUIProvider>
  );
};

const useGameBootstrap = (mode: "flashcards" | "write") => {
  const { isSR, moduleId, srNumber } = useGameRouteParams();

  const sessionKey = isSR
    ? `${mode}:sr:${srNumber}`
    : `${mode}:module:${moduleId}`;

  const { data } = useGameActiveCardsQuery();

  const initAndPrepareFlashcards = useGameStore(
    s => s.initAndPrepareFlashcards,
  );
  const initAndPrepareWrite = useGameStore(s => s.initAndPrepareWrite);
  const resetAllGameFields = useGameStore(s => s.resetAllGameFields);
  const resetOrder = useGameStore(s => s.resetOrder);

  const initializedSession = useRef<string | null>(null);

  const resetGameSession = useCallback(() => {
    resetAllGameFields();
    resetOrder();
    useGameCardsUIStore.getState().reset();
  }, [resetAllGameFields, resetOrder]);

  useEffect(() => {
    return () => {
      resetGameSession();
    };
  }, [resetGameSession]);

  useEffect(() => {
    if (initializedSession.current === null) return;
    initializedSession.current = null;
    resetGameSession();
  }, [sessionKey, resetGameSession]);

  useEffect(() => {
    const entries = data?.entries;
    if (!entries?.length) return;
    if (initializedSession.current === sessionKey) return;

    initializedSession.current = sessionKey;

    const cardMode = isSR ? "sr" : "module";

    if (mode === "flashcards") initAndPrepareFlashcards(entries, cardMode);
    else if (mode === "write") initAndPrepareWrite(entries, cardMode);
  }, [
    data?.entries,
    sessionKey,
    initAndPrepareFlashcards,
    initAndPrepareWrite,
    isSR,
    mode,
  ]);
};

export default memo(GameShell);
