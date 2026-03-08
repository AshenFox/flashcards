export type ImgurlFields = {
  ok: boolean;
};

export type ImgurlBase = {
  url: string;
  thumbnail?: string;
  snippet?: string;
  context?: string;
};

export type ImgurlObj = ImgurlFields & ImgurlBase;

export type ImgurlObjs = {
  [key: string]: ImgurlObj;
};

// ---------------------------------------------------------------------------
// Card UI state (client-only fields per card)
// ---------------------------------------------------------------------------

export type CardFields = {
  edit: boolean;
  gallery: {
    search: boolean;
    query: string;
    loading: boolean;
    position: number;
    error: boolean;
    imgurl_obj?: ImgurlObjs;
    all?: number;
    loaded?: number;
    failed?: number;
    width?: number;
  };
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
  gallery: {
    search: false,
    query: "",
    loading: false,
    position: 0,
    error: false,
  },
  scrape: { loading: false },
  sr: { loading: false },
  save: false,
  question: false,
};
