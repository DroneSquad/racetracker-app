import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { connect as _connect } from 'react-redux';

import { notNull } from './utils';

import { combineReducers } from 'redux';
// allows dispatch of actions from anywhere: store.dispatch(push('/foo'))
import { routerReducer } from 'react-router-redux';

import authReducer from './routes/login/modules/login';
import raceReducer from './routes/fly/modules/race';
import trackerReducer from './routes/tracker/modules/racetracker';
import bluetoothReducer from './routes/tracker/modules/bluetooth';

const config = {
  key: 'root', // key is required
  storage // storage is now required
};

/** The global reducers object, this is mutable and attach reducer when the classes will load */
let reducers = {
  router: routerReducer, // react-router-redux v5.0
  auth: authReducer,
  race: raceReducer,
  trackers: trackerReducer,
  bluetooth: bluetoothReducer
};

/** This function will get called after the loading screen happens before it renders the main content */
export default function configStore(history) {
  // middleware, reducers, and routing
  const reducer = persistReducer(config, combineReducers(reducers));
  const middleware = applyMiddleware(routerMiddleware(history), thunk);
  // create store and persist for rehydration
  const store = createStore(reducer, composeWithDevTools(middleware));
  const persistor = persistStore(store);
  // and finally send it back
  return { store, persistor };
}

/**
 * This is to test decorators, this logic is a WIP and may / will change without notice
 * @returns {function(*=)}
 */
export function connect(reducer, key) {
  if (reducer && key && !(key in reducers)) {
    reducers[key] = reducer; // attach the reducer to the store
  }
  return clazz => {
    // depending how advance we can get this we may be able to grab them from variables within the class
    let mapStateToProps = notNull(clazz.mapStateToProps, 'mapStateToProps');
    // depending how advance we can get this we may be able to grab them from function within the class
    let mapDispatchToProps = notNull(clazz.mapDispatchToProps, 'mapDispatchToProps');
    return _connect(mapStateToProps, mapDispatchToProps)(clazz);
  };
}
