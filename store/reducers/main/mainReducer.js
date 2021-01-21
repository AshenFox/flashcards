import {
  SET_IS_SERVER,
  GET_MODULES,
  SET_SKIP_CARDS,
  SET_SKIP_MODULES,
  SET_MAIN_LOADING,
  GET_CARDS,
  CONTROL_SEARCH_CARDS,
  CONTROL_SEARCH_MODULES,
  SET_SELECT_BY,
  SET_SELECT_CREATED,
  RESET_FIELDS_CARDS,
  RESET_FIELDS_MODULES,
  RESET_SEARCH,
  GET_MODULE,
  GET_MODULE_CARDS,
  CLEAR_MODULE,
  SET_CARD_EDIT,
  CONTROL_CARD,
  CONTROL_MODULE,
  SET_GALLERY_SEARCH,
  CONTROL_GALLERY_QUERY,
  SEARCH_IMGAGES,
  SET_URL_OK,
  RESET_GALLERY_FIELDS,
  SET_GALLERY_LOADING,
  MOVE_GALLERY,
  SET_GALLERY_WIDTH,
  SET_CARD_IMGURL,
  SCRAPE_DICTIONARY,
  SET_SCRAPE_LOADING,
  SET_GALLERY_ERROR,
  SET_SCROLL_TOP,
  DELETE_CARD,
  CREATE_CARD,
  DROP_CARD_SR,
  DROP_CARDS_SR,
  SET_CARD_SR,
  SET_CARDS_SR,
  SET_CARDS_SR_POSITIVE,
  GET_SR_CARDS,
  PUT_SR_ANSWER,
  SET_CARD_SAVE,
  SET_CARDS_SAVE,
  SET_CARDS_SAVE_POSITIVE,
  SET_MODULE_QUESTION,
  SET_CARD_QUESTION,
  SET_MODULE_LOADING,
  SHUFFLE_FLASHCARDS,
  SORT_FLASHCARDS,
} from '../../actions/types';
import initialState from './mainInitState';

const MainReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_IS_SERVER:
      return {
        ...state,
        is_server: payload.value,
      };

    case CLEAR_MODULE:
      return {
        ...state,
        module: false,
        cards: {},
      };

    case GET_MODULE:
      return {
        ...state,
        module: payload.module,
        cards: payload.cards,
      };

    case GET_MODULE_CARDS:
      return {
        ...state,
        ...payload,
        cards: { ...state.cards, ...payload.cards },
      };

    case RESET_FIELDS_CARDS:
      return {
        ...state,
        cards: {},
        cards_number: false,
        all_cards: false,
        skip_cards: 0,
      };

    case RESET_FIELDS_MODULES:
      return {
        ...state,
        modules: [],
        draft: false,
        modules_number: false,
        all_modules: false,
        skip_modules: 0,
      };

    case RESET_SEARCH:
      return {
        ...state,
        search_cards: {
          value: '',
        },
        search_modules: {
          value: '',
        },
        select_by: { value: 'term', label: 'Term' },
        select_created: { value: 'newest', label: 'Newest' },
      };

    case SET_SELECT_BY:
      return {
        ...state,
        select_by: payload,
      };

    case SET_SELECT_CREATED:
      return {
        ...state,
        select_created: payload,
      };

    case SET_SCROLL_TOP:
      return {
        ...state,
        scroll_top: payload.value,
      };

    case SET_MODULE_LOADING:
      return {
        ...state,
        module: {
          ...state.module,
          module_loading: payload.value,
        },
      };

    case CONTROL_SEARCH_CARDS:
      return {
        ...state,
        search_cards: {
          value: payload.value,
        },
      };

    case CONTROL_SEARCH_MODULES:
      return {
        ...state,
        search_modules: {
          value: payload.value,
        },
      };

    case SET_MAIN_LOADING:
      return {
        ...state,
        loading: payload,
      };

    case SET_SKIP_MODULES:
      return {
        ...state,
        skip_modules: payload,
      };

    case SET_SKIP_CARDS:
      return {
        ...state,
        skip_cards: payload,
      };
    case GET_MODULES:
      return {
        ...state,
        ...payload,
        modules: [...state.modules, ...payload.modules],
      };

    case GET_CARDS:
      return {
        ...state,
        ...payload,
        cards: { ...state.cards, ...payload.cards },
      };

    // edit

    case SET_CARD_EDIT:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: {
            ...state.cards[payload._id],
            edit: payload.value,
          },
        },
      };

    case SET_CARD_QUESTION:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: {
            ...state.cards[payload._id],
            question: payload.value,
          },
        },
      };

    case SET_CARD_SAVE:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: {
            ...state.cards[payload._id],
            save: payload.value,
          },
        },
      };

    case SET_CARDS_SAVE:
      return {
        ...state,
        cards: Object.fromEntries(
          Object.entries(state.cards).map(([_id, card]) => [
            _id,
            { ...card, save: payload.value },
          ])
        ),
      };

    case SET_CARDS_SAVE_POSITIVE:
      return {
        ...state,
        cards: Object.fromEntries(
          Object.entries(state.cards).map(([_id, card]) => {
            if (payload._id_arr.includes(_id)) {
              return [_id, { ...card, save: true }];
            } else {
              return [_id, card];
            }
          })
        ),
      };

    case SET_CARD_SR:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: {
            ...state.cards[payload._id],
            studyRegime: payload.value,
          },
        },
      };

    case SET_CARDS_SR:
      return {
        ...state,
        cards: Object.fromEntries(
          Object.entries(state.cards).map(([_id, card]) => [
            _id,
            { ...card, studyRegime: payload.value },
          ])
        ),
      };

    case SET_CARDS_SR_POSITIVE:
      return {
        ...state,
        cards: Object.fromEntries(
          Object.entries(state.cards).map(([_id, card]) => {
            if (payload._id_arr.includes(_id)) {
              return [_id, { ...card, studyRegime: true }];
            } else {
              return [_id, card];
            }
          })
        ),
      };

    case DROP_CARD_SR:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: {
            ...state.cards[payload._id],
            stage: payload.stage,
            nextRep: payload.nextRep,
            prevStage: payload.prevStage,
            lastRep: payload.lastRep,
          },
        },
      };

    case PUT_SR_ANSWER:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: {
            ...state.cards[payload._id],
            stage: payload.stage,
            nextRep: payload.nextRep,
            prevStage: payload.prevStage,
            lastRep: payload.lastRep,
            studyRegime: payload.studyRegime,
          },
        },
      };

    case DROP_CARDS_SR:
      return {
        ...state,
        cards: Object.fromEntries(
          Object.entries(state.cards).map(([_id, card]) => [
            _id,
            {
              ...card,
              stage: payload.stage,
              nextRep: payload.nextRep,
              prevStage: payload.prevStage,
              lastRep: payload.lastRep,
            },
          ])
        ),
      };

    case GET_SR_CARDS:
      return {
        ...state,
        cards: Object.fromEntries(shuffle(Object.entries(payload.cards))),
      };

    case SHUFFLE_FLASHCARDS:
      return {
        ...state,
        cards: Object.fromEntries(shuffle(Object.entries(state.cards))),
      };

    case SORT_FLASHCARDS:
      return {
        ...state,
        cards: Object.fromEntries(
          Object.entries(state.cards).sort(
            ([, a], [, b]) => new Date(a.creation_date) - new Date(b.creation_date)
          )
        ),
      };

    case SET_MODULE_QUESTION:
      return {
        ...state,
        module: {
          ...state.module,
          question: payload.value,
        },
      };

    case SET_GALLERY_SEARCH:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: {
            ...state.cards[payload._id],
            gallery: {
              ...state.cards[payload._id].gallery,
              search: payload.value,
            },
          },
        },
      };

    case CONTROL_CARD:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: {
            ...state.cards[payload._id],
            [payload.type]: payload.value,
          },
        },
      };

    case CONTROL_MODULE:
      return {
        ...state,
        module: {
          ...state.module,
          title: payload.value,
        },
      };

    case CONTROL_GALLERY_QUERY:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: {
            ...state.cards[payload._id],
            gallery: {
              ...state.cards[payload._id].gallery,
              query: payload.value,
            },
          },
        },
      };

    case SEARCH_IMGAGES:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: {
            ...state.cards[payload._id],
            gallery: {
              ...state.cards[payload._id].gallery,
              imgurl_obj: payload.imgurl_obj,
              all: payload.all,
            },
          },
        },
      };

    case SET_URL_OK:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: {
            ...state.cards[payload._id],
            gallery: {
              ...state.cards[payload._id].gallery,
              imgurl_obj: {
                ...state.cards[payload._id].gallery.imgurl_obj,
                [payload.index]: {
                  ...state.cards[payload._id].gallery.imgurl_obj[payload.index],
                  ok: payload.value,
                },
              },
              loaded: payload.loaded,
              failed: payload.failed,
            },
          },
        },
      };

    case RESET_GALLERY_FIELDS:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: {
            ...state.cards[payload._id],
            gallery: {
              ...state.cards[payload._id].gallery,
              imgurl_obj: {},
              loaded: 0,
              failed: 0,
              all: 0,
              position: 0,
              width: 0,
              loading: false,
              error: false,
            },
          },
        },
      };

    case SET_GALLERY_LOADING:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: {
            ...state.cards[payload._id],
            gallery: {
              ...state.cards[payload._id].gallery,
              loading: payload.loading,
            },
          },
        },
      };

    case SET_GALLERY_WIDTH:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: {
            ...state.cards[payload._id],
            gallery: {
              ...state.cards[payload._id].gallery,
              width: payload.width,
            },
          },
        },
      };

    case MOVE_GALLERY:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: {
            ...state.cards[payload._id],
            gallery: {
              ...state.cards[payload._id].gallery,
              position: state.cards[payload._id].gallery.position + payload.offset,
            },
          },
        },
      };

    case SET_CARD_IMGURL:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: {
            ...state.cards[payload._id],
            imgurl: payload.imgurl,
          },
        },
      };

    case SCRAPE_DICTIONARY:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: {
            ...state.cards[payload._id],
            defenition: state.cards[payload._id].defenition + payload.result,
          },
        },
      };

    case SET_SCRAPE_LOADING:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: {
            ...state.cards[payload._id],
            scrape: {
              loading: payload.loading,
            },
          },
        },
      };

    case SET_GALLERY_ERROR:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: {
            ...state.cards[payload._id],
            gallery: {
              ...state.cards[payload._id].gallery,
              error: payload.error,
            },
          },
        },
      };

    case DELETE_CARD:
      return {
        ...state,
        cards: Object.fromEntries(
          Object.entries(state.cards).filter(([_id]) => _id !== payload._id)
        ),
      };

    case CREATE_CARD:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: payload,
        },
      };

    default:
      return state;
  }
};

export default MainReducer;

// ==============================
// ==============================
// ==============================

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};
