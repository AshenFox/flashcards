import {
  CLEAR_MODULE,
  CONTROL_SEARCH_CARDS,
  GET_CARDS,
  GET_HOME_MODULES,
  GET_MODULE,
  GET_MODULE_CARDS,
  RESET_FIELDS_CARDS,
  RESET_HOME_MODULES_DATA,
  RESET_HOME_MODULES_FILTERS,
  RESET_SEARCH,
  SET_ENTRY_COLLECTION_FILTER,
  SET_HOME_MODULES_LOADING,
  SET_IS_SERVER,
  SET_MAIN_LOADING,
  SET_SCROLL_TOP,
  SET_SELECT_BY,
  SET_SELECT_CREATED,
  SET_SKIP_CARDS,
} from "../../types";
import { MainActions } from "../../types";
import initialState, {
  defaultHomeModulesData,
  defaultHomeModulesFilters,
  MainState,
} from "./mainInitState";
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

    case SET_ENTRY_COLLECTION_FILTER:
      return {
        ...state,
        [payload.entryCollection]: {
          ...state[payload.entryCollection],
          filters: {
            ...state[payload.entryCollection].filters,
            [payload.filter]: payload.value,
          },
        },
      };

    case RESET_FIELDS_CARDS:
      return {
        ...state,
        cards: {},
        cards_number: false,
        all_cards: false,
        skip_cards: 0,
      };

    case RESET_HOME_MODULES_DATA:
      return {
        ...state,
        draft: null,
        homeModules: {
          ...state.homeModules,
          data: defaultHomeModulesData,
        },
      };

    case RESET_HOME_MODULES_FILTERS:
      return {
        ...state,
        homeModules: {
          ...state.homeModules,
          filters: defaultHomeModulesFilters,
        },
      };

    case RESET_SEARCH:
      return {
        ...state,
        search_cards: {
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

    case SET_MAIN_LOADING:
      return {
        ...state,
        loading: payload,
      };

    case SET_SKIP_CARDS:
      return {
        ...state,
        skip_cards: payload,
      };

    case SET_HOME_MODULES_LOADING:
      return {
        ...state,
        homeModules: {
          ...state.homeModules,
          loading: payload,
        },
      };

    case GET_HOME_MODULES:
      return {
        ...state,
        draft: payload.draft,
        homeModules: {
          ...state.homeModules,

          data: {
            ...state.homeModules.data,
            ...payload.modules,
            page: payload.modules.page + 1,
            entries: [
              ...state.homeModules.data.entries,
              ...payload.modules.entries,
            ],
          },
        },
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
