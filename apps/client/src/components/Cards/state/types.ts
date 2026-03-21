import { GetMainCardsResponseDto } from "@flashcards/common";

// ---------------------------------------------------------------------------
// Card UI state (client-only fields per card)
// ---------------------------------------------------------------------------

export type CardFields = {
  edit: boolean;
  save: boolean;
};

export type CardsUIStore = {
  cards: Record<string, CardFields | undefined>;
  get: (_id: string) => CardFields;
  set: (_id: string, updater: (draft: CardFields) => void) => void;
  reset: () => void;
};

export const defaultCardUI: CardFields = {
  edit: false,
  save: false,
};

export type MainCardsCache = { pages: GetMainCardsResponseDto[] };
