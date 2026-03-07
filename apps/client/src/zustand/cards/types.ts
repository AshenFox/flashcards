import type { CardDto } from "@flashcards/common";

// ---------------------------------------------------------------------------
// Card actions (context API)
// ---------------------------------------------------------------------------

export type CardActions = {
  editCard: (_id: string) => void;
  deleteCard: (_id: string) => void;
  dropCardSR: (_id: string) => void;
  setCardSR: (_id: string, value: boolean) => void;
  setCardsSRPositive: (_id: string) => void;
  scrapeDictionary: (_id: string, value: "cod" | "urban") => void;
  searchImages: (_id: string) => void;
  setUrlOk: (_id: string, index: string, value: boolean) => void;

  setCardEdit: (payload: { _id: string; value: boolean }) => void;
  controlCard: (payload: {
    _id: string;
    type: "term" | "definition";
    value: string;
  }) => void;
  setCardImgurl: (payload: { _id: string; value: string }) => void;
  setCardQuestion: (payload: { _id: string; value: boolean }) => void;
  setCardSave: (payload: { _id: string; value: boolean }) => void;
  setCardsSavePositive: (_id: string) => void;
  setGallerySearch: (payload: { _id: string; value: boolean }) => void;
  controlGalleryQuery: (payload: { _id: string; value: string }) => void;
  resetGalleryFields: (payload: { _id: string }) => void;
  moveGallery: (payload: { _id: string; value: "left" | "right" }) => void;
};

// ---------------------------------------------------------------------------
// Gallery / image URL types (from store, copied for cards module independence)
// ---------------------------------------------------------------------------

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

/** Card = server data (CardDto) + client UI state (CardFields) */
export type Card = CardDto & CardFields;

export type CardUIStore = {
  cards: Record<string, CardFields>;
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
