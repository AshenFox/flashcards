import {
  CONTROL_GALLERY_QUERY,
  MOVE_GALLERY,
  RESET_GALLERY_FIELDS,
  SEARCH_IMAGES,
  SET_GALLERY_ERROR,
  SET_GALLERY_LOADING,
  SET_GALLERY_SEARCH,
  SET_GALLERY_WIDTH,
  SET_URL_OK,
} from "../../../types";
import { MainActions } from "../../../types";
import initialState from "../mainInitState";
import { MainState } from "./../mainInitState";

const subGalleryReducer = (
  state = initialState,
  action: MainActions,
): MainState | false => {
  const { payload, type } = action;

  switch (type) {
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

    case SEARCH_IMAGES:
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
              position:
                state.cards[payload._id].gallery.position + payload.offset,
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

    default:
      return false;
  }
};

export default subGalleryReducer;
