import { CardDto } from "@flashcards/common";

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

export type CardsCache = {
  getCard: (_id: string) => CardDto | undefined;
  getAllCards: () => CardDto[];
  set: (
    recipe: (entries: CardDto[]) => void
  ) => void;
  invalidate: () => void;
};

// Hook type: no args => full state; with selector => selected state
export type StoreHook<S> = {
  (): S;
  <T>(selector: (state: S) => T): T;
};

export type CardsUIStoreHook = StoreHook<CardsUIStore>;

export type CardsCacheHook = () => CardsCache;
