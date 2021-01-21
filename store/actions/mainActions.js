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
  SET_SCROLL_TOP,
} from './types';
import { card_fields, module_fields } from '../reducers/main/mainInitState';
import axios from '../../server/supplemental/axios';

// SET_MAIN_LOADING
export const set_main_loading = (value) => ({
  type: SET_MAIN_LOADING,
  payload: value,
});

// SET_IS_SERVER
export const set_is_server = () => ({
  type: SET_IS_SERVER,
  payload: {
    value: typeof document === 'undefined',
  },
});

// CLEAR_MODULE
export const clear_module = () => ({
  type: CLEAR_MODULE,
});

// RESET_FIELDS_CARDS
export const reset_fields_cards = () => ({
  type: RESET_FIELDS_CARDS,
});

// RESET_FIELDS_MODULES
export const reset_fields_modules = () => ({
  type: RESET_FIELDS_MODULES,
});

// RESET_SEARCH
export const reset_search = () => ({
  type: RESET_SEARCH,
});

// SET_SELECT_BY
export const set_select_by = (value) => ({
  type: SET_SELECT_BY,
  payload: value,
});

// SET_SELECT_CREATED
export const set_select_created = (value) => ({
  type: SET_SELECT_CREATED,
  payload: value,
});

// SET_SCROLL_TOP
export const set_scroll_top = (value) => ({
  type: SET_SCROLL_TOP,
  payload: {
    value,
  },
});

// CONTROL_SEARCH_CARDS
export const control_search_cards = (value) => ({
  type: CONTROL_SEARCH_CARDS,
  payload: {
    value,
  },
});

// CONTROL_SEARCH_MODULES
export const control_search_modules = (value) => ({
  type: CONTROL_SEARCH_MODULES,
  payload: {
    value,
  },
});

// GET MODULES
export const get_modules = (ignore) => async (dispatch, getState) => {
  try {
    const {
      auth: { user },
      main: { skip_modules, all_modules, search_modules, select_created, loading },
    } = getState();
    if (!user || all_modules) return;
    if (!ignore && loading) return;

    dispatch({
      type: SET_MAIN_LOADING,
      payload: true,
    });

    const { data } = await axios.get('/api/main/modules', {
      params: {
        skip: skip_modules,
        filter: search_modules.value,
        created: select_created.value,
      },
    });

    dispatch({ type: GET_MODULES, payload: data });
    dispatch({
      type: SET_SKIP_MODULES,
      payload: skip_modules + 1,
    });
  } catch (err) {
    console.error(err);
  }

  dispatch({
    type: SET_MAIN_LOADING,
    payload: false,
  });
};

// GET CARDS
export const get_cards = (ignore) => async (dispatch, getState) => {
  try {
    const {
      auth: { user },
      main: { skip_cards, all_cards, search_cards, select_by, select_created, loading },
    } = getState();
    if (!user || all_cards) return;
    if (!ignore && loading) return;

    dispatch({
      type: SET_MAIN_LOADING,
      payload: true,
    });

    const { data } = await axios.get('/api/main/cards', {
      params: {
        skip: skip_cards,
        filter: search_cards.value,
        by: select_by.value,
        created: select_created.value,
      },
    });

    data.cards = arr_to_obj(data.cards);

    dispatch({ type: GET_CARDS, payload: data });
    dispatch({
      type: SET_SKIP_CARDS,
      payload: skip_cards + 1,
    });
  } catch (err) {
    console.error(err);
  }

  dispatch({
    type: SET_MAIN_LOADING,
    payload: false,
  });
};

// GET MODULE CARDS
export const get_module_cards = (_id) => async (dispatch, getState) => {
  try {
    const {
      auth: { user },
      main: { search_cards, select_by, select_created },
    } = getState();
    if (!user) return; // loading

    dispatch({
      type: SET_MAIN_LOADING,
      payload: true,
    });

    const { data } = await axios.get('/api/main/module/cards', {
      params: {
        _id,
        filter: search_cards.value,
        by: select_by.value,
        created: select_created.value,
      },
    });

    data.cards = arr_to_obj(data.cards);

    dispatch({ type: GET_MODULE_CARDS, payload: data });
  } catch (err) {
    console.error(err);
  }

  dispatch({
    type: SET_MAIN_LOADING,
    payload: false,
  });
};

// GET_MODULE
export const get_module = (_id) => async (dispatch, getState) => {
  try {
    const {
      auth: { user },
    } = getState();
    if (!user) return; // loading

    dispatch({
      type: SET_MAIN_LOADING,
      payload: true,
    });

    const { data } = await axios.get('/api/main/module', {
      params: {
        _id,
      },
    });

    data.cards = arr_to_obj(data.cards);
    data.module = { ...data.module, ...module_fields };

    dispatch({ type: GET_MODULE, payload: data });
  } catch (err) {
    window.location.replace(`/home/modules`);
    console.error(err);
  }

  dispatch({
    type: SET_MAIN_LOADING,
    payload: false,
  });
};

// GET_DRAFT
export const get_draft = () => async (dispatch, getState) => {
  try {
    const {
      auth: { user },
    } = getState();
    if (!user) return; // loading

    dispatch({
      type: SET_MAIN_LOADING,
      payload: true,
    });

    const { data } = await axios.get('/api/edit/draft');

    data.cards = arr_to_obj(data.cards);
    data.module = { ...data.module, ...module_fields };

    dispatch({ type: GET_MODULE, payload: data });
  } catch (err) {
    window.location.replace(`/home/modules`);
    console.error(err);
  }

  dispatch({
    type: SET_MAIN_LOADING,
    payload: false,
  });
};

// ==============================
// ==============================
// ==============================

const arr_to_obj = (arr) => {
  return Object.fromEntries(
    arr.map((card) => [
      card._id,
      {
        ...card,
        ...card_fields,
      },
    ])
  );
};
