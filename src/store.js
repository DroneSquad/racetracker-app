import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import Saga from './saga';
import reducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

export default function configStore(history) {

  const middleware = applyMiddleware(
    routerMiddleware(history),
    sagaMiddleware
  );

  // TODO: input reducers dynamically and then combine
  // create the store
  //  const store = createStore(
  //    combineReducers({
  //      ...reducer,
  //      router: routerReducer
  //  }),
  //  middleware);

  // create store
  const store = createStore(reducer, middleware);

  // run the saga middleware
  sagaMiddleware.run(Saga);

  return store;
}
