export default {
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

export const card_fields = {
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

export const module_fields = {
  question: false,
  module_loading: false,
};

export const url_fields = {
  ok: false,
};
