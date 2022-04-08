import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkDispatch, ThunkMiddleware } from 'redux-thunk';
import rootReducer from './reducers/index';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';

const initialState = {};

const middleware = [thunk];

const isDev = process.env.NODE_ENV === 'development'; // from create-react-app

const store = isDev
  ? createStore(
      rootReducer,
      initialState,
      composeWithDevTools({
        trace: true,
        traceLimit: 25,
      })(applyMiddleware(...middleware))
    )
  : createStore(rootReducer, initialState, applyMiddleware(...middleware));

export default store;
