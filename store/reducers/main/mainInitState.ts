export type MainState = {
  is_server: boolean;
  module: Module | false;
  draft: Module | false;
  modules: Module[];
  cards: Cards;
  modules_number: number | false;
  cards_number: number | false;
  all_modules: boolean;
  all_cards: boolean;
  skip_modules: number;
  skip_cards: number;
  loading: boolean;
  all_modules_number: number | false;
  all_cards_number: number | false;
  search_cards: {
    value: string;
  };
  search_modules: {
    value: string;
  };
  select_by: SelectBy;
  select_created: SelectCreated;
  scroll_top: boolean;
};

export interface SelectBy {
  value: 'term' | 'defenition';
  label: 'Term' | 'Defenition';
}

export interface SelectCreated {
  value: 'newest' | 'oldest';
  label: 'Newest' | 'Oldest';
}

export interface ImgurlFields {
  ok: Boolean;
}

export interface ImgurlBase {
  url: string;
  thumbnail?: string;
  snippet?: string;
  context?: string;
}

export interface ImgurlObj extends ImgurlFields, ImgurlBase {}

export interface ImgurlObjs {
  [key: string]: ImgurlObj;
}

export interface CardFields {
  edit: boolean;
  gallery: {
    search: boolean;
    query: string;
    imgurl_obj: ImgurlObjs; // ?????
    loading: boolean;
    loaded: number;
    failed: number;
    all: number;
    position: number;
    width: number;
    error: boolean; // ???
  };
  scrape: {
    loading: boolean;
  };
  save: boolean;
  question: boolean;
}

export interface CardBase {
  _id: string;
  moduleID: string;
  term: string;
  defenition: string;
  imgurl: string;
  creation_date: string;
  studyRegime: boolean;
  stage: number;
  nextRep: string;
  lastRep: string;
  prevStage: string;
  __v: number;
}

export interface Card extends CardFields, CardBase {}

export interface Cards {
  [key: string]: Card;
}

export interface ModuleFields {
  question: boolean;
  module_loading: boolean;
}

export interface Module extends ModuleFields {
  cards: []; // ??????
  _id: string;
  title: string;
  author: string;
  aothor_id: string;
  number: number;
  creation_date: string;
  draft: boolean;
  __v: number;
}

// =================================================

export const card_fields: CardFields = {
  edit: false,
  gallery: {
    search: false,
    query: '',
    imgurl_obj: {},
    loading: false,
    loaded: 0,
    failed: 0,
    all: 0,
    position: 0,
    width: 0,
    error: false,
  },
  scrape: {
    loading: false,
  },
  save: true,
  question: false,
};

export const module_fields: ModuleFields = {
  question: false,
  module_loading: false,
};

export const url_fields: ImgurlFields = {
  ok: false,
};

const mainInitState: MainState = {
  is_server: true,
  module: false,
  draft: false,
  modules: [],
  cards: {},
  modules_number: false,
  cards_number: false,
  all_modules: false,
  all_cards: false,
  skip_modules: 0,
  skip_cards: 0,
  loading: false,
  all_modules_number: false,
  all_cards_number: false,
  search_cards: {
    value: '',
  },
  search_modules: {
    value: '',
  },
  select_by: { value: 'term', label: 'Term' },
  select_created: { value: 'newest', label: 'Newest' },
  scroll_top: false,
};

export default mainInitState;
