import { createStore } from 'redux';
import { MakeStore } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './modules/rootSaga';

import bindMiddleware from './bindMiddleware';
import rootReducer from './modules/rootReducer';

export const makeStore: MakeStore = initialState => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware]),
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export default makeStore;
