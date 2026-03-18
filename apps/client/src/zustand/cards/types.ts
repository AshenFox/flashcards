import { GetMainCardsResponseDto } from "@flashcards/common";

// ---------------------------------------------------------------------------
// Card UI state (client-only fields per card)
// ---------------------------------------------------------------------------

export type CardFields = {
  edit: boolean;
  scrape: {
    loading: boolean;
  };
  sr: {
    loading: boolean;
  };
  save: boolean;
  question: boolean;
};

export type CardsUIStore = {
  cards: Record<string, CardFields | undefined>;
  get: (_id: string) => CardFields;
  set: (_id: string, updater: (draft: CardFields) => void) => void;
  reset: () => void;
};

export const defaultCardUI: CardFields = {
  edit: false,
  scrape: { loading: false },
  sr: { loading: false },
  save: false,
  question: false,
};

export type MainCardsCache = { pages: GetMainCardsResponseDto[] };
