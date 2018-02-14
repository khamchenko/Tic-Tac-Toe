import { applyMiddleware, createStore, compose } from 'redux';

import redusers from '../reducers';
import middlewares from '../middlewares';

let composeEnhancers = compose;

if (__DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
);

export default function (initialState = {}) {

  const store = createStore( redusers, initialState, enhancer);

  return store;
}
