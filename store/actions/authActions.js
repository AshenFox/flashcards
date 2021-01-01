import {
  ENTER,
  CHANGE_MODAL_LOADING,
  CHECK_FIELD,
  CLEAR_LOG_IN,
  CLEAR_SIGN_UP,
  AUTHENTICATE,
  CHANGE_AUTH_LOADING,
  LOG_OUT,
} from './types';
import axios from '../../server/supplemental/axios';

// ENTER
export const enter = (type) => async (dispatch, getState) => {
  const pathname = window.location.pathname;
  try {
    const {
      modal: { log_in, sign_up, loading },
    } = getState();

    if (loading) throw new Error('The data is already being loaded ...');

    dispatch({
      type: CHANGE_MODAL_LOADING,
      payload: true,
    });

    const {
      data: { token, errors },
    } = await axios.post(
      `/api/auth/entry/${type}`,
      type === 'log_in' ? log_in : sign_up
    );

    if (token) {
      localStorage.setItem('value', token);
      axios.defaults.headers.Authorization = `Bearer ${token}`;
    }

    dispatch({
      type: ENTER,
      payload: { [`${type}_errors`]: errors },
    });
    // Clear Fields
    // Is it nessesary?
    if (token)
      type === 'log_in'
        ? dispatch({ type: CLEAR_LOG_IN })
        : dispatch({ type: CLEAR_SIGN_UP });

    if (pathname === '/' && errors.ok) window.location.replace('/home/modules');
  } catch (err) {
    console.error(err);
  }

  dispatch({
    type: CHANGE_MODAL_LOADING,
    payload: false,
  });
};

// CHECK_FIELD
export const check_field = (type) => async (dispatch, getState) => {
  try {
    const {
      modal: { sign_up },
    } = getState();

    dispatch({
      type: CHANGE_MODAL_LOADING,
      payload: true,
    });

    const { data } = await axios.post(`/api/auth/check/sign_up`, sign_up);

    const payload = {
      ok: data.ok,
      [type]: data[type],
    };

    dispatch({
      type: CHECK_FIELD,
      payload,
    });
  } catch (err) {
    console.error(err);
  }

  dispatch({
    type: CHANGE_MODAL_LOADING,
    payload: false,
  });
};

// AUTHENTICATE

export const authenticate = () => async (dispatch, getState) => {
  const pathname = window.location.pathname;
  try {
    dispatch({
      type: CHANGE_AUTH_LOADING,
      payload: true,
    });

    const token = localStorage.getItem('value');

    if (!token && pathname !== '/') {
      throw new Error('Authentication error - not allowed');
    }

    if (token) {
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data } = await axios.get(`/api/auth`);

      if (pathname === '/') {
        window.location.replace('/home/modules');
        throw new Error('Authentication error - logged in');
      }

      dispatch({ type: AUTHENTICATE, payload: data });
    }
  } catch (err) {
    console.error(err);
    if (pathname !== '/') window.location.replace('/');
    return;
  }

  dispatch({ type: CHANGE_AUTH_LOADING, payload: false });
};

// LOG_OUT
export const log_out = () => {
  const pathname = window.location.pathname;

  localStorage.removeItem('value');
  axios.defaults.headers.Authorization = undefined;

  if (pathname !== '/') window.location.replace('/');
  return { type: LOG_OUT };
};
