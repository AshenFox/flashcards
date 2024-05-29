import {
  CLEAR_MODULE,
  CONTROL_SEARCH_CARDS,
  CONTROL_SEARCH_MODULES,
  GET_CARDS,
  GET_MODULE,
  GET_MODULE_CARDS,
  GET_MODULES,
  RESET_FIELDS_CARDS,
  RESET_FIELDS_MODULES,
  RESET_SEARCH,
  SET_IS_SERVER,
  SET_MAIN_LOADING,
  SET_SCROLL_TOP,
  SET_SELECT_BY,
  SET_SELECT_CREATED,
  SET_SKIP_CARDS,
  SET_SKIP_MODULES,
} from "../../types/types";
import { MainActions } from "./../../types/types";
import initialState, { MainState } from "./mainInitState";
import subEditReducer from "./subReducers/subEditReducer";
import subFlashcardsReducer from "./subReducers/subFlashcardsReducer";
import subGalleryReducer from "./subReducers/subGalleryReducer";
import subScrapeReducer from "./subReducers/subScrapeReducer";
import subSrReducer from "./subReducers/subSrReducer";

const MainReducer = (state = initialState, action: MainActions): MainState => {
  const { payload, type } = action;

  let editResult = subEditReducer(state, action);
  if (editResult) return editResult;
  // ==========
  let galleryResult = subGalleryReducer(state, action);
  if (galleryResult) return galleryResult;
  // ==========
  let scrapeResult = subScrapeReducer(state, action);
  if (scrapeResult) return scrapeResult;
  // ==========
  let srResult = subSrReducer(state, action);
  if (srResult) return srResult;
  // ==========
  let flashcardsResult = subFlashcardsReducer(state, action);
  if (flashcardsResult) return flashcardsResult;
  // ==========

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
          value: "",
        },
        search_modules: {
          value: "",
        },
        select_by: { value: "term", label: "Term" },
        select_created: { value: "newest", label: "Newest" },
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

    default:
      return state;
  }
};

export default MainReducer;
