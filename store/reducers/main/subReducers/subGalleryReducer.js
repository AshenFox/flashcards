import {
  SET_GALLERY_SEARCH,
  CONTROL_GALLERY_QUERY,
  RESET_GALLERY_FIELDS,
  SET_GALLERY_LOADING,
  SET_GALLERY_WIDTH,
  MOVE_GALLERY,
  SET_GALLERY_ERROR,
  SET_URL_OK,
  SEARCH_IMGAGES,
} from '../../../types/types';
import initialState from '../mainInitState';

const subGalleryReducer = (state, action) => {
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
