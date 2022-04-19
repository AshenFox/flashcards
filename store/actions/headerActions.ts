import { AppActions } from './../types/types';
import { SET_DROPDOWN } from '../types/types';

// SET_DROPDOWN
export const set_dropdown = (value: boolean): AppActions => ({
  type: SET_DROPDOWN,
  payload: value,
});
