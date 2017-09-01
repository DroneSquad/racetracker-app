import { combineReducers } from 'redux';
// TODO: investigate if we actually should use this, or keep our redux pure
import { routerReducer } from 'react-router-redux';

import { authReducer } from './auth';
import trackers from './tracker';
import bluetooth from './bluetooth';

const rootReducer = combineReducers({
  auth: authReducer,
  router: routerReducer,
  trackers: trackers,
  bluetooth: bluetooth
});

export default rootReducer;
