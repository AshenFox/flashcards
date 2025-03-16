import { ImgurlObjs, MainCaseReducer } from "../types";

export const setGallerySearch: MainCaseReducer<{
  _id: string;
  value: boolean;
}> = (state, { payload }) => {
  state.cards[payload._id].gallery.search = payload.value;
};

export const setUrlOkReducer: MainCaseReducer<{
  _id: string;
  index: string;
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

export const searchImagesReducer: MainCaseReducer<{
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
  value: boolean;
}> = (state, { payload }) => {
  state.cards[payload._id].gallery.loading = payload.value;
};

export const setGalleryWidth: MainCaseReducer<{
  _id: string;
  value: number;
}> = (state, { payload }) => {
  const width = 2 + 15 * payload.value + 2 * (payload.value - 1);

  state.cards[payload._id].gallery.width = width;
};

export const moveGallery: MainCaseReducer<{
  _id: string;
  value: "left" | "right";
}> = (state, { payload: { _id, value } }) => {
  let offset = 0;
  if (value === "left") offset = 17;
  if (value === "right") offset = -17;

  state.cards[_id].gallery.position += offset;
};

export const setGalleryError: MainCaseReducer<{
  _id: string;
  value: boolean;
}> = (state, { payload }) => {
  state.cards[payload._id].gallery.error = payload.value;
};
