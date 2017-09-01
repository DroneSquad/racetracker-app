import { combineReducers } from 'redux';
// TODO: investigate if we actually should use this, or keep our redux pure
import { routerReducer } from 'react-router-redux';

import { authReducer } from './auth';
import trackers from './tracker';

const rootReducer = combineReducers({
  auth: authReducer,
  router: routerReducer,
  trackers: trackers
});

export default rootReducer;
