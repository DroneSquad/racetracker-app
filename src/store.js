import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const config = {
  key: 'root', // key is required
  storage // storage is now required
};

const reducer = persistReducer(config, rootReducer);

export default function configStore(history) {
  const middleware = applyMiddleware(routerMiddleware(history), thunk);
  // create store
  const store = createStore(reducer, composeWithDevTools(middleware));
  const persistor = persistStore(store);
  // and finally send it back
  return { store, persistor };
}
