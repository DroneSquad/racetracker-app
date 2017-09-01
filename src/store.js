import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import Saga from './saga';
import reducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

export default function configStore(history) {
  const middleware = applyMiddleware(routerMiddleware(history), sagaMiddleware, thunk);

  // create store
  const store = createStore(reducer, composeWithDevTools(middleware));

  // run the saga middleware
  sagaMiddleware.run(Saga);

  return store;
}
