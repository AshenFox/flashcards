import {
  GET_MODULES,
  SET_SKIP_CARDS,
  SET_SKIP_MODULES,
  SET_MAIN_LOADING,
  GET_CARDS,
  CONTROL_SEARCH_CARDS,
  CONTROL_SEARCH_MODULES,
  SET_SELECT,
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

// SET_SELECT
export const set_select = (value) => ({
  type: SET_SELECT,
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
export const get_modules = () => async (dispatch, getState) => {
  try {
    const {
      auth: { user },
      main: { skip_modules, loading, all_modules, search_modules },
    } = getState();
    if (!user || loading || all_modules) return;

    dispatch({
      type: SET_MAIN_LOADING,
      payload: true,
    });

    const { data } = await axios.get('/api/main/modules', {
      params: {
        skip: skip_modules,
        filter: search_modules.value,
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
export const get_cards = () => async (dispatch, getState) => {
  try {
    const {
      auth: { user },
      main: { skip_cards, loading, all_cards, search_cards, select },
    } = getState();
    if (!user || loading || all_cards) return;

    dispatch({
      type: SET_MAIN_LOADING,
      payload: true,
    });

    const { data } = await axios.get('/api/main/cards', {
      params: {
        skip: skip_cards,
        filter: search_cards.value,
        by: select.value,
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
      main: { loading, search_cards, select },
    } = getState();
    if (!user || loading) return;

    dispatch({
      type: SET_MAIN_LOADING,
      payload: true,
    });

    const { data } = await axios.get('/api/main/module/cards', {
      params: {
        _id,
        filter: search_cards.value,
        by: select.value,
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
      main: { loading },
    } = getState();
    if (!user || loading) return;

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
      main: { loading },
    } = getState();
    if (!user || loading) return;

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
