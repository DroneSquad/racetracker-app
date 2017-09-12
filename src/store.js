import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './reducers';

export default function configStore(history) {
  const middleware = applyMiddleware(routerMiddleware(history), thunk);
  // create store
  const store = createStore(reducer, composeWithDevTools(middleware));
  // and finally send it back
  return store;
}
