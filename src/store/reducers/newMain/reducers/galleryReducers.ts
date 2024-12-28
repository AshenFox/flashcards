import { ImgurlObjs, MainCaseReducer } from "../types";

export const setGallerySearch: MainCaseReducer<{
  _id: string;
  value: boolean;
}> = (state, { payload }) => {
  state.cards[payload._id].gallery.search = payload.value;
};

export const setUrlOk: MainCaseReducer<{
  _id: string;
  index: number;
  value: boolean;
  loaded: number;
  failed: number;
}> = (state, { payload }) => {
  const gallery = state.cards[payload._id].gallery;
  gallery.imgurl_obj[payload.index].ok = payload.value;
  gallery.loaded = payload.loaded;
  gallery.failed = payload.failed;
};

export const controlGalleryQuery: MainCaseReducer<{
  _id: string;
  value: string;
}> = (state, { payload }) => {
  state.cards[payload._id].gallery.query = payload.value;
};

export const searchImages: MainCaseReducer<{
  _id: string;
  imgurl_obj: ImgurlObjs;
  all: number;
}> = (state, { payload }) => {
  const gallery = state.cards[payload._id].gallery;
  gallery.imgurl_obj = payload.imgurl_obj;
  gallery.all = payload.all;
};

export const resetGalleryFields: MainCaseReducer<{ _id: string }> = (
  state,
  { payload },
) => {
  const gallery = state.cards[payload._id].gallery;
  gallery.imgurl_obj = {};
  gallery.loaded = 0;
  gallery.failed = 0;
  gallery.all = 0;
  gallery.position = 0;
  gallery.width = 0;
  gallery.loading = false;
  gallery.error = false;
};

export const setGalleryLoading: MainCaseReducer<{
  _id: string;
  loading: boolean;
}> = (state, { payload }) => {
  state.cards[payload._id].gallery.loading = payload.loading;
};

export const setGalleryWidth: MainCaseReducer<{
  _id: string;
  width: number;
}> = (state, { payload }) => {
  state.cards[payload._id].gallery.width = payload.width;
};

export const moveGallery: MainCaseReducer<{
  _id: string;
  offset: number;
}> = (state, { payload }) => {
  state.cards[payload._id].gallery.position += payload.offset;
};

export const setGalleryError: MainCaseReducer<{
  _id: string;
  error: boolean;
}> = (state, { payload }) => {
  state.cards[payload._id].gallery.error = payload.error;
};
