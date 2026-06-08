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

  const initFromCards = useGameStore(s => s.initFromCards);
  const prepareFlashcards = useGameStore(s => s.prepareFlashcards);
  const prepareWrite = useGameStore(s => s.prepareWrite);
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
    initializedSession.current = null;
    resetGameSession();
  }, [sessionKey, resetGameSession]);

  useEffect(() => {
    const entries = data?.entries;
    if (!entries?.length) return;
    if (initializedSession.current === sessionKey) return;

    initializedSession.current = sessionKey;

    const cardsById = Object.fromEntries(entries.map(c => [c._id, c]));

    initFromCards(entries, isSR ? "sr" : "module");

    if (mode === "flashcards") prepareFlashcards();
    else prepareWrite(cardsById);
  }, [
    data?.entries,
    sessionKey,
    initFromCards,
    isSR,
    mode,
    prepareFlashcards,
    prepareWrite,
  ]);
};

export default memo(GameShell);
