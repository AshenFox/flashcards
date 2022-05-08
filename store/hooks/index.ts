import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppDispatch, RootState } from '../store';
import * as authActions from '../actions/authActions';
import * as dimenActions from '../actions/dimenActions';
import * as editActions from '../actions/editActions';
import * as gameActions from '../actions/gameActions';
import * as headerActions from '../actions/headerActions';
import * as mainActions from '../actions/mainActions';
import * as modalActions from '../actions/modalActions';
import * as srActions from '../actions/srActions';
import * as voiceActions from '../actions/voiceActions';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useActions = () => {
  const dispatch = useAppDispatch();

  return bindActionCreators(
    {
      ...authActions,
      ...dimenActions,
      ...editActions,
      ...gameActions,
      ...headerActions,
      ...mainActions,
      ...modalActions,
      ...srActions,
      ...voiceActions,
    },
    dispatch
  );
};
